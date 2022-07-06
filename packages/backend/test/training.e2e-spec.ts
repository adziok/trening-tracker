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

    beforeEach(async () => {
        const { userSessionFactory } = await createTestingApp();
        session = await userSessionFactory.create({ username: 'test', email: 'test@test.com' });
    });

    it('should create training without providing start time', async () => {
        const { data } = await session.trainingControllerCreateTraining({
            name: 'First training',
        });
        expect(data.id).toBeDefined();
    });

    it('should create training with providing start time', async () => {
        const { data } = await session.trainingControllerCreateTraining({
            name: 'First training',
            startedAt: new Date().toDateString(),
        });
        expect(data.id).toBeDefined();
    });

    it('should update training name', async () => {
        const {
            data: { id },
        } = await session.trainingControllerCreateTraining({
            name: 'First training',
            startedAt: new Date().toDateString(),
        });
        await session.trainingControllerUpdateTraining({
            id,
            name: 'First training updated',
        });

        const { data } = await session.trainingControllerGet(id);
        expect(data).toEqual(
            expect.objectContaining({
                id: id,
                name: 'First training updated',
            })
        );
    });

    it('should list trainings', async () => {
        await session.trainingControllerCreateTraining({
            name: 'First training',
            startedAt: new Date().toDateString(),
        });
        await session.trainingControllerCreateTraining({
            name: 'Second training',
            startedAt: new Date().toDateString(),
        });

        const { data } = await session.trainingControllerList();
        expect(data.nodes).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: 'First training',
                }),
                expect.objectContaining({
                    id: expect.any(String),
                    name: 'Second training',
                }),
            ])
        );
    });

    it('should get training by id', async () => {
        const {
            data: { id },
        } = await session.trainingControllerCreateTraining({
            name: 'First training',
            startedAt: new Date().toDateString(),
        });

        const { data } = await session.trainingControllerGet(id);
        expect(data).toEqual(
            expect.objectContaining({
                id: id,
                name: 'First training',
            })
        );
    });
});
