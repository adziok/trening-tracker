import { Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthConfigService } from './AuthConfigService';
import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

export type VerifiedPayload = {
    sub: string;
    iss: string;
    version: number;
    client_id: string;
    origin_jti: string;
    token_use: 'access';
    scope: string;
    auth_time: number;
    exp: number;
    iat: number;
    jti: string;
    username: string;
};

@Injectable()
export class JwtVerifier {
    private verifier: { verify: (token: string) => Promise<CognitoAccessTokenPayload> };

    constructor(private readonly config: AuthConfigService) {
        this.verifier = CognitoJwtVerifier.create({
            userPoolId: config.get('cognito.userPoolId'),
            tokenUse: 'access',
            clientId: null,
        });
    }

    verifyOrThrow(token: string): Promise<VerifiedPayload> {
        return this.verifier.verify(token);
    }
}
