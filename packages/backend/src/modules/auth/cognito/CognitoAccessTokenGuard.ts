import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtVerifier } from '../JwtVerifier';
import { IAccountsApi } from '../../accounts/application/AccountsApi';

@Injectable()
export class CognitoAccessTokenGuard implements CanActivate {
    constructor(private readonly accountFacade: IAccountsApi, private readonly verifier: JwtVerifier) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = request.header('Authorization')?.replace('Bearer ', '');

            const value = await this.verifier.verifyOrThrow(token);
            request.user = this.accountFacade.getAccountByProvider('cognito', value.sub);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
