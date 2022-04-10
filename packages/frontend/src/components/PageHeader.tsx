import React from 'react';
import { Burger, Container, Group, Text } from '@mantine/core';

export const PageHeader = () => {
    return (
        <Container className={'border-red-500 border-0 border-b-2 border-solid box-border w-full'}>
            <Group position={'apart'}>
                <Text>🏋️Training Tracker</Text>
                <Burger opened={false} />
            </Group>
        </Container>
    );
};
