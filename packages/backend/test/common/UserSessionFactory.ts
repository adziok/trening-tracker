import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { agent } from 'supertest';
import { AccountFacade } from '../../src/modules/accounts/application/AccountFacade';
import * as api from '../temp/sdk';

export type UserSession = typeof api;

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

        api.defaults.headers = {
            Authorization: `Bearer ${providerId}`,
        };
        api.defaults.fetch = supertestFetch(this.app);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return api;
    }
}

const supertestFetch = (app: INestApplication) => {
    const request = agent(app.getHttpServer());
    return (
        url: string,
        data: {
            method: string;
            headers: Record<string, string>;
            body: string;
        }
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return request[data.method?.toLowerCase() || 'get'](url)
            .set(data.headers)
            .send(data.body && JSON.parse(data.body))
            .then((response): Partial<Response> => {
                return {
                    text: () => Promise.resolve(response.text),
                    json: () => Promise.resolve(response.body),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    headers: new Headers(response.headers),
                    ok: !response?.body?.errors,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    body: response.body,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    status: response.status,
                };
            });
    };
};
