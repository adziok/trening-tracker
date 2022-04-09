import { Account } from './Account';
import { TAccountId } from './AccountFacade';
import { AsyncResult } from '../../../shared/classes/Result';

export abstract class AccountRepository {
    abstract findByEmail(email: string): AsyncResult<Account>;
    abstract findById(id: TAccountId): AsyncResult<Account>;
    abstract findByProvider(providerType: string, providerId: string): AsyncResult<Account>;
    abstract save(account: Account): AsyncResult<TAccountId>;
}
