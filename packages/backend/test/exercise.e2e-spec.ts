import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';

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
        const { data } = await session.exerciseControllerCreateExerciseInTraining({
            name: 'Bench Press',
            trainingId,
            templateId: '',
        });
        expect(data.id).toBeDefined();
    });

    it('should list exercises in training', async () => {
        await session.exerciseControllerCreateExerciseInTraining({
            name: 'Bench Press',
            trainingId,
            templateId: '',
        });
        await session.exerciseControllerCreateExerciseInTraining({
            name: 'Pull up',
            trainingId,
            templateId: '',
        });

        const { data } = await session.exerciseControllerList(10, 0, trainingId);
        expect(data.nodes).toEqual(
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

    it('should add series to exercise', async () => {
        const {
            data: { id: exerciseId },
        } = await session.exerciseControllerCreateExerciseInTraining({
            name: 'Bench Press',
            trainingId,
            templateId: '',
        });

        await session.exerciseControllerCreateSeriesInExercise(trainingId, exerciseId, {
            weight: 10,
            reps: 10,
        });

        const { data } = await session.exerciseControllerList(10, 0, trainingId);
        expect(data.nodes).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: 'Bench Press',
                    series: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            reps: 10,
                            weight: 10,
                        }),
                    ]),
                }),
            ])
        );
    });

    it('should remove exercise from training', async () => {
        const {
            data: { id: exerciseId },
        } = await session.exerciseControllerCreateExerciseInTraining({
            name: 'Bench Press',
            trainingId,
            templateId: '',
        });

        await session.exerciseControllerRemoveExerciseFromTraining(trainingId, exerciseId);

        const { data } = await session.exerciseControllerList(10, 0, trainingId);
        expect(data.nodes.length).toEqual(0);
    });
});

export const createTraining = (session: UserSession, opt?: { name: string }): Promise<string> => {
    return session
        .trainingControllerCreateTraining({
            name: opt?.name || 'First training',
        })
        .then((res) => res.data.id);
};
