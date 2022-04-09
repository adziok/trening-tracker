import { Global, Module } from '@nestjs/common';
import { AccountFacade } from './application/AccountFacade';
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
            provide: AccountFacade,
            useClass: AccountService,
        },
    ],
    exports: [AccountFacade],
})
export class AccountsModule {}
