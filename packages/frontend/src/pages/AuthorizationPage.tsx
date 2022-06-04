import React from 'react';
import { PageWrapper } from '../components';
import { generalConfig } from '../configs/general';
import { Anchor } from '@mantine/core';

function AuthorizationPage() {
    return (
        <PageWrapper className="bg-theme-3 bg-bg">
            <div className="p-10 pb-32 text-theme-1 text-center text-theme-5 z-50 w-1/2">
                <Anchor size={'md'} href={`${generalConfig.backendUrl!}/auth`}>
                    SignIn
                </Anchor>
            </div>
        </PageWrapper>
    );
}

export default AuthorizationPage;
