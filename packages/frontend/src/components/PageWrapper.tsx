import React, { ReactNode } from 'react';
import { Container } from '@mantine/core';

type PageWrapperProps = {
    children: ReactNode;
    className?: string;
};

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
    return <Container className={`${className}`}>{children}</Container>;
};
