import { Controller, Get } from '@nestjs/common';
import { Authorized } from '../modules/auth';
import { CurrentAccount } from '../modules/auth/CurrentAccount';
import { TAccount } from '../modules/accounts/application/AccountFacade';

@Authorized()
@Controller('accounts')
export class AccountsController {
    constructor() {}

    @Get('me')
    me(@CurrentAccount() account: TAccount): Promise<{ id: string }> {
        console.log(account);
        return Promise.resolve({ id: account.id });
    }
}
