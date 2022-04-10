import React from 'react';
import { PageWrapper } from '../components';
import { Button } from '@mantine/core';

export function PlaygroundPage() {
    return (
        <PageWrapper className="bg-theme-3 bg-bg">
            <div className="bg-mountains h-screen w-screen bg-repeat-x fixed bg-bottom z-10 bg-a-20p bg-[length:200%] sm:bg-[length:100%]">
                {' '}
            </div>
            <div className="bg-clouds h-screen animate-moveRight w-screen bg-repeat-x fixed bg-bottom z-10 bg-a-30p bg-50p opacity-30">
                {' '}
            </div>

            <div className="fixed h-1/2 z-50 w-screen -bottom-0">
                <div className="flex flex-col p-5 h-full">
                    <div className="flex flex-row">Name:</div>
                    <div className="flex flex-row">
                        <input className="w-full" type="text" />
                    </div>
                    <div className="flex flex-row">Time:</div>
                    <div className="flex flex-row">
                        <input className="w-full" type="datetime-local" />
                        <Button size="sm" variant={'light'}>
                            Now
                        </Button>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-row justify-between">
                        <Button size="sm" variant={'filled'}>
                            Cancel
                        </Button>
                        <Button size="sm">Save</Button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
