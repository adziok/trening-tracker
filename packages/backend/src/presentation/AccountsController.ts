import { Controller, Get } from '@nestjs/common';
import { Authorized } from '../modules/auth';
import { CurrentAccount } from '../modules/auth/CurrentAccount';
import { TAccount } from '../modules/accounts/application/AccountFacade';
import { MutableActionResultDto } from './common/MutableActionResultDto';

@Authorized()
@Controller('accounts')
export class AccountsController {
    constructor() {}

    @Get('me')
    me(@CurrentAccount() account: TAccount): MutableActionResultDto {
        return { id: account.id };
    }
}
