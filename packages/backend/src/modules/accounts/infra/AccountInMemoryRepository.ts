import { AccountRepository } from '../application/AccountRepository';
import { TAccountId } from '../application/AccountFacade';
import { Account } from '../application/Account';
import { AsyncResult, err, ok } from '../../../shared/classes/Result';
import { LocalFileDatabase } from '../../../shared/LocalFileDatabase';

export class AccountInMemoryRepository implements AccountRepository {
    private db = new LocalFileDatabase<Account>('accounts');

    findByEmail(email: string): AsyncResult<Account> {
        if (this.db.data[email]) {
            return Promise.resolve(ok(this.db.data[email]));
        }
        return Promise.resolve(err(new Error('Account with given email not found')));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findById(_id: TAccountId): AsyncResult<Account> {
        return undefined;
    }

    findByProvider(providerType: string, providerId: string): AsyncResult<Account> {
        const account = Object.values(this.db.data).find(
            (account: Account) => account.providerId === providerId && account.providerType === providerType
        );
        if (account) {
            return Promise.resolve(ok(account));
        }
        return Promise.resolve(err(new Error('Account with given provider data does not exists')));
    }

    save(account: Account): AsyncResult<TAccountId> {
        this.db.data[account.email] = account;
        this.db.save();
        return Promise.resolve(ok(account.id));
    }
}
