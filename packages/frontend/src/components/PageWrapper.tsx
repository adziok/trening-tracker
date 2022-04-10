import React, { ReactNode } from 'react';
import { Container, Stack } from '@mantine/core';
import { PageHeader } from './PageHeader';

type PageWrapperProps = { header?: ReactNode; children: ReactNode; className?: string; footer?: ReactNode };

const ScrollableContent = ({ children }: PageWrapperProps) => {
    return <Container className={`h-full box-border w-full overflow-x-hidden overflow-y-auto`}>{children}</Container>;
};

export const PageWrapper = ({ children, className = '', header = <PageHeader />, footer }: PageWrapperProps) => {
    return (
        <Stack className={'h-screen overflow-hidden'} align={'stretch'} spacing={'xs'}>
            {header}
            <ScrollableContent>{children}</ScrollableContent>
            {footer && footer}
        </Stack>
    );
};
