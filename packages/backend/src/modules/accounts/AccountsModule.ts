import { Global, Module } from '@nestjs/common';
import { IAccountsApi } from './application/AccountsApi';
import { AccountService } from './application/AccountService';
import { AccountRepository } from './application/AccountRepository';
import { AccountInMemoryRepository } from './infra/AccountInMemoryRepository';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: AccountRepository,
            useClass: AccountInMemoryRepository,
        },
        {
            provide: IAccountsApi,
            useClass: AccountService,
        },
    ],
    exports: [IAccountsApi],
})
export class AccountsModule {}
