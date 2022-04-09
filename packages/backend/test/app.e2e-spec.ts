import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';
import { Response } from 'supertest';

describe('AppController (e2e)', () => {
    let session: UserSession;

    beforeEach(async () => {
        const { userSessionFactory } = await createTestingApp();
        session = await userSessionFactory.create({ username: 'test', email: 'test@test.com' });
    });

    it('/accounts/me (GET)', async () => {
        await session
            .get('/accounts/me')
            .set(session.authorizationHeaders())
            .expect((res: Response) => {
                expect(res.body.id).toBeDefined();
            });
    });
});
