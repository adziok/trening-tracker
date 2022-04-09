import React from 'react';
import { Button, PageWrapper } from '../components';
import { generalConfig } from '../configs/general';

export function PlaygroundPage() {
    return (
        <PageWrapper className="bg-theme-3 bg-bg">
            <div className="bg-mountains h-screen w-screen bg-repeat-x fixed bg-bottom z-10 bg-a-20p bg-[length:200%] sm:bg-[length:100%]">
                {' '}
            </div>
            <div className="bg-clouds h-screen animate-moveRight w-screen bg-repeat-x fixed bg-bottom z-10 bg-a-30p bg-50p opacity-30">
                {' '}
            </div>
            <div className="p-10 pb-32 text-theme-1 text-center text-theme-5 z-50 w-1/2">
                <Button background={'bg-theme-2'} size={'md'} href={`${generalConfig.backendUrl!}/auth`}>
                    Sign In
                </Button>
            </div>
        </PageWrapper>
    );
}
