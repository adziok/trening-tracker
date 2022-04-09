import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TAccount } from '../accounts/application/AccountFacade';
import { Request } from 'express';

export const CurrentAccount = createParamDecorator((ctx: ExecutionContext): TAccount => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.user as TAccount;
});
