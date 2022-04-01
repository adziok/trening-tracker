import { CognitoAccessTokenGuard } from './cognito/CognitoAccessTokenGuard';
import { UseGuards } from '@nestjs/common';

export { AuthModule } from './AuthModule';
export { TAuthConfig } from './AuthConfigService';

export const Authorized = UseGuards(CognitoAccessTokenGuard);
