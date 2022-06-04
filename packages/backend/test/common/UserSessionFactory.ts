import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { agent, SuperAgentTest } from 'supertest';
import { AccountFacade } from '../../src/modules/accounts/application/AccountFacade';

export type UserSession = SuperAgentTest & { authorizationHeaders: () => Record<string, string> };

export class UserSessionFactory {
    constructor(private app: INestApplication) {}

    async create(data: { username: string; email: string }): Promise<UserSession> {
        const accountApi = this.app.get(AccountFacade);
        const providerId = randomUUID();
        const account = await accountApi.createAccount({
            ...data,
            providerType: 'cognito',
            providerId,
        });
        if (account.hasError()) {
            throw new Error('Can not create UserSession');
        }
        const httpAgent = agent(this.app.getHttpServer());

        return Object.assign(httpAgent, {
            authorizationHeaders: () => ({ Authorization: `Bearer ${providerId}` }),
        });
    }
}
