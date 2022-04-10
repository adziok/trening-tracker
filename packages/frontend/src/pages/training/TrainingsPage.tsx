import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { PageWrapper } from '../../components';
import { CreateTrainingModal } from './CreateTrainingModal';

export function TrainingsPage() {
    const [opened, setOpened] = useState(false);

    return (
        <PageWrapper>
            <Button onClick={() => setOpened(true)}>Create training</Button>
            <CreateTrainingModal opened={opened} onClose={() => setOpened(false)} />
        </PageWrapper>
    );
}
