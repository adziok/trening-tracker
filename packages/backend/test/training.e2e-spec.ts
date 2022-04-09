import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';
import { Response } from 'supertest';

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
});
