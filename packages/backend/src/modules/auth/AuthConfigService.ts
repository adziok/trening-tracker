import { Injectable } from '@nestjs/common';

export type TAuthConfig = {
    jwt: {
        useCookie: boolean;
        cookieKey?: string;
        expiresIn: number;
        secret: string;
    };
    cognito: {
        domain: string;
        region: string;
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
        userPoolId: string;
    };
    successCallbackUrl: string;
    failCallbackUrl: string;
};

type TDotJoinedAuthConfig =
    | `jwt.${keyof TAuthConfig['jwt']}`
    | `cognito.${keyof TAuthConfig['cognito']}`
    | `${keyof TAuthConfig}`;

@Injectable()
export class AuthConfigService {
    constructor(private readonly config: TAuthConfig) {}

    get<T extends string | boolean | number>(key: TDotJoinedAuthConfig): T {
        const keys = key.split('.');
        return this.getNestedValue<T>(keys);
    }

    private getNestedValue<T>(keys: string[]): T {
        return keys.reduce((prev: Record<string, unknown>, curr) => prev[curr], this.config) as T;
    }
}
