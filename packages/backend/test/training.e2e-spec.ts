import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';
import { Response } from 'supertest';

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
        await session
            .post('/training')
            .set(session.authorizationHeaders())
            .send({
                name: 'First training',
            })
            .expect((res: Response) => {
                expect(res.body.id).toBeDefined();
            });
    });

    it('should create training with providing start time', async () => {
        await session
            .post('/training')
            .set(session.authorizationHeaders())
            .send({
                name: 'First training',
                startedAt: new Date(),
            })
            .expect((res: Response) => {
                expect(res.body.id).toBeDefined();
            });
    });

    it('should list trainings', async () => {
        await session.post('/training').set(session.authorizationHeaders()).send({
            name: 'First training',
            startedAt: new Date(),
        });
        await session.post('/training').set(session.authorizationHeaders()).send({
            name: 'Second training',
            startedAt: new Date(),
        });

        await session
            .get('/training')
            .set(session.authorizationHeaders())
            .send()
            .expect((res) => {
                expect(res.body.nodes).toEqual(
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
    });

    it('should get training by id', async () => {
        const {
            body: { id },
        }: { body: { id: string } } = await session.post('/training').set(session.authorizationHeaders()).send({
            name: 'First training',
            startedAt: new Date(),
        });

        await session
            .get(`/training/${id}`)
            .set(session.authorizationHeaders())
            .send()
            .expect((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: id,
                        name: 'First training',
                    })
                );
            });
    });
});
