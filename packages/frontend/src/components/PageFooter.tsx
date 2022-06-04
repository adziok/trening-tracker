import React, { ReactNode } from 'react';
import { Container, Group } from '@mantine/core';

type PageHeaderProps = {
    children: ReactNode;
    position?: 'apart' | 'center' | 'left' | 'right';
};

export const PageFooter = ({ children, position = 'center' }: PageHeaderProps) => {
    return (
        <Container className={'border-red-100 border-0 border-t-2 border-solid box-border w-full py-2'}>
            <Group position={position}>{children}</Group>
        </Container>
    );
};
