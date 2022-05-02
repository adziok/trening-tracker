import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';
import { ICreateExerciseInTrainingDto, IRemoveExerciseFromTrainingDto } from '@trening-tracker/shared';

const data = {};
jest.mock('../src/shared/FSWrapper.ts', () => {
    return {
        FSWrapper: {
            writeFileSync(path: string, _data: string) {
                data[path] = _data;
            },
            readFileSync(path: string): string {
                return data[path] as string;
            },
            existsSync(path: string) {
                return !!data[path];
            },
        },
    };
});

describe('AppController (e2e)', () => {
    let session: UserSession;
    let trainingId: string;

    beforeEach(async () => {
        const { userSessionFactory } = await createTestingApp();
        session = await userSessionFactory.create({ username: 'test', email: 'test@test.com' });
        trainingId = await createTraining(session);
    });

    it('should create exercise in training and return id', async () => {
        await session
            .post('/exercise')
            .set(session.authorizationHeaders())
            .send({
                name: 'Bench Press',
                trainingId,
            } as ICreateExerciseInTrainingDto)
            .expect((res) => {
                expect(res.body.id).toBeDefined();
            });
    });

    it('should list exercises in training', async () => {
        await session
            .post('/exercise')
            .set(session.authorizationHeaders())
            .send({
                name: 'Bench Press',
                trainingId,
            } as ICreateExerciseInTrainingDto);
        await session
            .post('/exercise')
            .set(session.authorizationHeaders())
            .send({
                name: 'Pull up',
                trainingId,
            } as ICreateExerciseInTrainingDto);

        await session
            .get('/exercise')
            .query({ trainingId })
            .set(session.authorizationHeaders())
            .send()
            .expect((res) => {
                expect(res.body.nodes).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            name: 'Bench Press',
                        }),
                        expect.objectContaining({
                            id: expect.any(String),
                            name: 'Pull up',
                        }),
                    ])
                );
            });
    });

    it('should remove exercise from training', async () => {
        const {
            body: { id: exerciseId },
        } = await session
            .post('/exercise')
            .set(session.authorizationHeaders())
            .send({
                name: 'Bench Press',
                trainingId,
            } as ICreateExerciseInTrainingDto);

        await session
            .delete('/exercise')
            .set(session.authorizationHeaders())
            .send({
                exerciseId,
                trainingId,
            } as IRemoveExerciseFromTrainingDto);

        await session
            .get('/exercise')
            .query({ trainingId })
            .set(session.authorizationHeaders())
            .send()
            .expect((res) => {
                expect(res.body.nodes.length).toEqual(0);
            });
    });
});

export const createTraining = (session: UserSession, opt?: { name: string }): Promise<string> => {
    return session
        .post('/training')
        .set(session.authorizationHeaders())
        .send({
            name: opt?.name || 'First training',
        })
        .then((res) => res.body.id);
};
