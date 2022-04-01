import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { InjectionToken } from '@nestjs/common/interfaces/modules/injection-token.interface';
import { OptionalFactoryDependency } from '@nestjs/common/interfaces/modules/optional-factory-dependency.interface';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './AuthController';
import { CognitoOauthModule } from './cognito/CognitoOauthModule';
import { AuthConfigService, TAuthConfig } from './AuthConfigService';

type RegisterAuthModuleOptions = {
    config: TAuthConfig;
};

type RegisterAsyncAuthModuleOptions = {
    useFactory(...args: any[]): TAuthConfig | Promise<TAuthConfig>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    imports?: ModuleMetadata['imports'];
};

@Global()
@Module({})
export class AuthModule {
    static register(options: RegisterAuthModuleOptions): DynamicModule {
        return {
            module: AuthModule,
            providers: [
                {
                    provide: AuthConfigService,
                    useFactory: () => {
                        return new AuthConfigService(options.config);
                    },
                },
            ],
            imports: [PassportModule, CognitoOauthModule],
            exports: [AuthConfigService],
            controllers: [AuthController],
        };
    }

    static registerAsync(options: RegisterAsyncAuthModuleOptions): DynamicModule {
        return {
            module: AuthModule,
            providers: [
                {
                    provide: AuthConfigService,
                    useFactory: (config: TAuthConfig) => new AuthConfigService(config),
                    inject: ['INJECTED_AUTH_CONFIG'],
                },
                {
                    provide: 'INJECTED_AUTH_CONFIG',
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
            ],
            imports: [PassportModule, CognitoOauthModule, ...(options.imports || [])],
            exports: [AuthConfigService],
            controllers: [AuthController],
        };
    }
}
