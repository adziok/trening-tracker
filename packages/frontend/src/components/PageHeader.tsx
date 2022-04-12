import React from 'react';
import { Burger, Container, Group, Text } from '@mantine/core';

export const PageHeader = () => {
    return (
        <Container className={'border-red-100 border-0 border-b-2 border-solid box-border w-full py-3'}>
            <Group position={'apart'}>
                <Text size={'xl'}>🏋️Training Tracker</Text>
                <Burger opened={false} />
            </Group>
        </Container>
    );
};
