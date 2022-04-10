import React, { ReactNode } from 'react';
import { Container, Stack } from '@mantine/core';
import { PageHeader } from './PageHeader';

type PageWrapperProps = { header?: ReactNode; children: ReactNode; className?: string };

const ScrollableContent = ({ children }: PageWrapperProps) => {
    return <Container className={`h-full box-border w-full overflow-x-hidden`}>{children}</Container>;
};

export const PageWrapper = ({ children, className = ' ', header = <PageHeader /> }: PageWrapperProps) => {
    return (
        <Stack className={'h-screen overflow-hidden'} align={'stretch'} spacing={'xs'}>
            {header}
            <ScrollableContent>{children}</ScrollableContent>
        </Stack>
    );
};
