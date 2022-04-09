import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtVerifier } from '../JwtVerifier';
import { AccountFacade } from '../../accounts/application/AccountFacade';

@Injectable()
export class CognitoAccessTokenGuard implements CanActivate {
    constructor(private readonly accountFacade: AccountFacade, private readonly verifier: JwtVerifier) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = request.header('Authorization')?.replace('Bearer ', '');

            const value = await this.verifier.verifyOrThrow(token);
            const user = await this.accountFacade.getAccountByProvider('cognito', value.sub);
            if (user.isOk()) {
                request.user = user.value;
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
