import { Injectable } from '@nestjs/common';
import { AccountFacade, TAccount, TAccountId, TCreateAccount } from './AccountFacade';
import { AccountRepository } from './AccountRepository';
import { Account } from './Account';
import { AsyncResult, BaseError, ok } from '../../../shared/classes/Result';

@Injectable()
export class AccountService implements AccountFacade {
    constructor(private readonly accountRepository: AccountRepository) {}

    createAccount(accountData: TCreateAccount): AsyncResult<TAccountId> {
        const account = Account.create(accountData);
        return this.accountRepository.save(account);
    }

    async getAccountByEmail(email: string): AsyncResult<TAccount> {
        return (await this.accountRepository.findByEmail(email)).map<TAccount>((value: Account) =>
            ok<TAccount, BaseError>({
                id: value.id,
                email: value.email,
                imageUrl: '',
                username: value.username,
            })
        );
    }

    async getAccountByProvider(providerType: string, providerId: string): AsyncResult<TAccount> {
        return (await this.accountRepository.findByProvider(providerType, providerId)).map<TAccount>((value: Account) =>
            ok<TAccount, BaseError>({
                id: value.id,
                email: value.email,
                imageUrl: '',
                username: value.username,
            })
        );
    }
}
