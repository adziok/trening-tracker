import { Module } from '@nestjs/common';
import { CognitoOauthController } from './CognitoOauthController';
import { CognitoOauthStrategy } from './CognitoOauthStrategy';
import { AccountsModule } from '../../accounts/AccountsModule';
import { CognitoAccessTokenGuard } from './CognitoAccessTokenGuard';

@Module({
    imports: [AccountsModule],
    controllers: [CognitoOauthController],
    providers: [CognitoOauthStrategy, CognitoAccessTokenGuard],
})
export class CognitoOauthModule {}
