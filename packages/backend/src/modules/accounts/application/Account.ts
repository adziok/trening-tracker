import { TAccountId, TCreateAccount } from './AccountsApi';
import { randomUUID } from 'crypto';

export class Account {
    id: TAccountId;
    providerId: string;
    providerType: string;
    username: string;
    email: string;
    imageUrl: string | null;

    static create(accountData: TCreateAccount) {
        const account = new this();
        account.id = randomUUID();
        Object.assign(account, accountData);
        return account;
    }
}
