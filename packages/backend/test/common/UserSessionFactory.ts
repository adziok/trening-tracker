import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { agent, SuperAgentTest } from 'supertest';
import { IAccountsApi } from '../../src/modules/accounts/application/AccountsApi';

export type UserSession = SuperAgentTest & { authorizationHeaders: () => Record<string, string> };

export class UserSessionFactory {
    constructor(private app: INestApplication) {}

    async create(data: { username: string; email: string }): Promise<UserSession> {
        const accountApi = this.app.get(IAccountsApi);
        const account = await accountApi.createAccount({
            ...data,
            providerName: 'cognito',
            providerId: randomUUID(),
        });
        if (account.hasError()) {
            throw new Error('Can not create UserSession');
        }
        const accountId = account.isOk() && account.value;
        const httpAgent = agent(this.app.getHttpServer());

        return Object.assign(httpAgent, {
            authorizationHeaders: () => ({ Authorization: `Bearer ${accountId}` }),
        });
    }
}
