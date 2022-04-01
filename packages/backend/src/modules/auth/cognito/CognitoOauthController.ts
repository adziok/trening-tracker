import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CognitoOauthGuard } from './CognitoOauthGuard';
import { AuthConfigService } from '../AuthConfigService';

@Controller('auth/cognito')
export class CognitoOauthController {
    constructor(private readonly configService: AuthConfigService) {}

    @Get()
    @UseGuards(CognitoOauthGuard)
    cognitoAuth(@Req() _req: Request, @Res() res: Response) {
        console.log(res);
        // Guard redirects
    }

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
