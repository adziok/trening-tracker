import { AsyncResult } from '../../../shared/classes/Result';

export type TAccountId = string;

export type TAccount = {
    id: TAccountId;
    username: string;
    email: string;
    imageUrl: string | null;
};

export type TCreateAccount = {
    username: string;
    email: string;
    providerName: string;
    providerId: string;
};

export abstract class IAccountsApi {
    abstract createAccount(account: TCreateAccount): AsyncResult<TAccountId>;
    abstract getAccountByEmail(email: string): AsyncResult<TAccount>;
}
