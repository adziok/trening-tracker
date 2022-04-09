import { mockClassWithDefaultThrow } from '../mockClassWithDefaultThrow';
import { JwtVerifier, VerifiedPayload } from '../../../src/modules/auth/JwtVerifier';

export const mockedJwtVerifier = mockClassWithDefaultThrow<JwtVerifier>(JwtVerifier, {
    verifyOrThrow(tokenAsUserId: string): Promise<VerifiedPayload> {
        return Promise.resolve({
            sub: tokenAsUserId,
        } as any as VerifiedPayload);
    },
});
