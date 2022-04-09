import { Controller, Get } from '@nestjs/common';
import { Authorized } from '../modules/auth';

@Authorized()
@Controller('accounts')
export class AccountsController {
    constructor() {}

    @Get('me')
    me(): Promise<{ id: string }> {
        return Promise.resolve({ id: 'ID_HERE' });
    }
}
