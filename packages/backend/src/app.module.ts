import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrainingModule } from './modules/training/TrainingModule';
import { AuthModule, TAuthConfig } from './modules/auth';
import { PresentationModule } from './presentation/PresentationModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TrainingModule,
        AuthModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TAuthConfig => {
                return {
                    jwt: {
                        expiresIn: configService.get<number>('JWT_EXPIRES_IN'),
                        secret: configService.get<string>('JWT_SECRET'),
                        useCookie: configService.get<boolean>('JWT_USE_COOKIE'),
                        cookieKey: configService.get<string>('JWT_COOKIE_KEY'),
                    },
                    cognito: {
                        userPoolId: configService.get<string>('COGNITO_POOL_ID'),
                        region: configService.get<string>('COGNITO_REGION'),
                        callbackUrl: configService.get<string>('COGNITO_CALLBACK_URL'),
                        domain: configService.get<string>('COGNITO_DOMAIN'),
                        clientId: configService.get<string>('COGNITO_CLIENT_ID'),
                        clientSecret: configService.get<string>('COGNITO_CLIENT_SECRET'),
                    },
                    successCallbackUrl: configService.get<string>('AUTH_SUCCESS_URL'),
                    failCallbackUrl: configService.get<string>('AUTH_FAILURE_URL'),
                };
            },
        }),
        PresentationModule,
    ],
})
export class AppModule {}
