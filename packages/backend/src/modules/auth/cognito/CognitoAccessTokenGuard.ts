import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtVerifier } from '../JwtVerifier';

@Injectable()
export class CognitoAccessTokenGuard implements CanActivate {
    constructor(private readonly verifier: JwtVerifier) {}

    static baseUrl(region: string, userPoolId: string): string {
        return `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = request.header('Authorization')?.replace('Bearer ', '');

            await this.verifier.verifyOrThrow(token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
