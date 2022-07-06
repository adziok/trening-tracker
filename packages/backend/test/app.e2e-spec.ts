import { createTestingApp } from './common';
import { UserSession } from './common/UserSessionFactory';

describe('AppController (e2e)', () => {
    let session: UserSession;

    beforeEach(async () => {
        const { userSessionFactory } = await createTestingApp();
        session = await userSessionFactory.create({ username: 'test', email: 'test@test.com' });
    });

    it('/accounts/me (GET)', async () => {
        const { data } = await session.accountsControllerMe();
        expect(data.id).toBeDefined();
    });
});
