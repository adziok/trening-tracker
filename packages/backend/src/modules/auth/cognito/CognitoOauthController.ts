import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CognitoOauthGuard } from './CognitoOauthGuard';
import { AuthConfigService } from '../AuthConfigService';

@Controller('auth/cognito')
export class CognitoOauthController {
    constructor(private readonly configService: AuthConfigService) {}

    @Get()
    @UseGuards(CognitoOauthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cognitoAuth() {}

    @Get('redirect')
    @UseGuards(CognitoOauthGuard)
    cognitoAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const tokens = res.req.user as { accessToken: string; refreshToken: string };
        res.redirect(
            `${this.configService.get<string>('successCallbackUrl')}?accessToken=${tokens.accessToken}&refreshToken=${
                tokens.refreshToken
            }`
        );
    }
}
