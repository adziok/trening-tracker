import { Body, Controller, Get, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import * as qs from 'qs';
import { CognitoOauthStrategy } from './cognito/CognitoOauthStrategy';
import { AuthConfigService } from './AuthConfigService';

@Controller('auth')
export class AuthController {
    constructor(private readonly config: AuthConfigService) {}

    @Get()
    auth(@Res() res: Response) {
        return res.redirect('/auth/cognito');
    }

    @Post('refresh')
    async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
        try {
            const tokenURL = CognitoOauthStrategy.tokenUrl(
                this.config.get('cognito.domain'),
                this.config.get('cognito.region')
            );

            const refreshTokenData = qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.config.get('cognito.clientId'),
                client_secret: this.config.get('cognito.clientSecret'),
            });

            const { data } = await axios.post<{ access_token: string }>(tokenURL, refreshTokenData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return {
                accessToken: data.access_token,
            };
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
