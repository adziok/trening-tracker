import React, { ReactNode } from 'react';
import { Container, Stack } from '@mantine/core';
import { PageHeader } from './PageHeader';

type PageWrapperProps = {
    header?: ReactNode;
    children: ReactNode;
    className?: string;
    footer?: ReactNode;
    noSidePaddings?: boolean;
};

const ScrollableContent = ({ children, noSidePaddings }: PageWrapperProps) => {
    return (
        <Container
            className={`h-full box-border w-full overflow-x-hidden overflow-y-auto`}
            fluid={true}
            px={noSidePaddings ? 0 : 'xs'}
        >
            {children}
        </Container>
    );
};

export const PageWrapper = ({
    children,
    className = '',
    header = <PageHeader />,
    footer,
    noSidePaddings = false,
}: PageWrapperProps) => {
    return (
        <Stack className={'h-screen overflow-hidden bg-gray-50'} align={'stretch'} spacing={0}>
            {header}
            <ScrollableContent noSidePaddings={noSidePaddings}>{children}</ScrollableContent>
            {footer && footer}
        </Stack>
    );
};
