import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { AuthConfigService } from '../AuthConfigService';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class CognitoAccessTokenGuard implements CanActivate {
    private verifier: { verify: (token: string) => any };

    constructor(
        private readonly config: AuthConfigService // private readonly jwtService: JwtService
    ) {
        this.verifier = CognitoJwtVerifier.create({
            userPoolId: config.get('cognito.userPoolId'),
            tokenUse: 'access',
            clientId: null,
        });
    }

    static baseUrl(region: string, userPoolId: string): string {
        return `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = request.header('Authorization')?.replace('Bearer ', '');

            await this.verifier.verify(token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
