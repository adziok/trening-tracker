import { Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthConfigService } from './AuthConfigService';

@Injectable()
export class JwtVerifier {
    private verifier: { verify: (token: string) => any };

    constructor(private readonly config: AuthConfigService) {
        this.verifier = CognitoJwtVerifier.create({
            userPoolId: config.get('cognito.userPoolId'),
            tokenUse: 'access',
            clientId: null,
        });
    }

    async verify(token: string): Promise<void> {
        await this.verifier.verify(token);
    }
}
