import { mockClassWithDefaultThrow } from '../mockClassWithDefaultThrow';
import { JwtVerifier, VerifiedPayload } from '../../../src/modules/auth/JwtVerifier';
import { UnauthorizedException } from '@nestjs/common';

export const mockedJwtVerifier = mockClassWithDefaultThrow<JwtVerifier>(JwtVerifier, {
    verifyOrThrow(tokenAsUserId: string): Promise<VerifiedPayload> {
        if (!tokenAsUserId) {
            throw new UnauthorizedException();
        }
        return Promise.resolve({
            sub: tokenAsUserId,
        } as any as VerifiedPayload);
    },
});
