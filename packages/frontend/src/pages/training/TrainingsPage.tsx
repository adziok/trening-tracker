import React, { useState } from 'react';
import { ActionIcon, Badge, Group, Stack, Text, Timeline } from '@mantine/core';
import { CirclePlus, Search } from 'tabler-icons-react';
import { PageWrapper } from '../../components';
import { CreateTrainingModal } from './CreateTrainingModal';
import { groupBy } from './GroupByUtil';
import dayjs from 'dayjs';
import { PageFooter } from '../../components/PageFooter';

const trainings = [
    {
        name: 'Chest Training',
        startedAt: new Date('2022-02-03'),
        tags: ['chest'],
    },
    {
        name: 'Legs Training',
        startedAt: new Date('2022-02-04'),
        tags: ['legs'],
    },
    {
        name: 'OHP Training',
        startedAt: new Date('2022-02-04'),
        tags: ['mantra'],
    },
    {
        name: 'Lorem ipsum',
        startedAt: new Date('2022-02-07'),
        tags: ['in madrid'],
    },
    {
        name: 'Nice legs',
        startedAt: new Date('2022-02-08'),
        tags: ['legs', 'hard'],
    },
    {
        name: 'Poop :))',
        startedAt: new Date('2022-02-09'),
        tags: ['brain'],
    },
    {
        name: 'Your best',
        startedAt: new Date('2022-02-09'),
        tags: ['biceps'],
    },
    {
        name: 'Max ',
        startedAt: new Date('2022-02-10'),
        tags: ['max', 'ohp'],
    },
];

const trainingsGroupedByStartedAt = groupBy(trainings, 'startedAt');

export function TrainingsPage() {
    const [opened, setOpened] = useState(false);

    return (
        <PageWrapper
            footer={
                <PageFooter position={'apart'}>
                    <ActionIcon variant="transparent" size={'xl'} onClick={() => setOpened(true)} disabled>
                        <Search size={50} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size={'xl'} onClick={() => setOpened(true)}>
                        <CirclePlus size={50} />
                    </ActionIcon>
                </PageFooter>
            }
        >
            <Timeline bulletSize={24} lineWidth={2}>
                {Object.entries(trainingsGroupedByStartedAt).map(([date, trainingsInDay]) => {
                    return (
                        <Timeline.Item title={dayjs(date).format('YYYY-MM-DD')}>
                            <Stack>
                                {trainingsInDay.map((training) => {
                                    return (
                                        <Stack spacing={'xs'}>
                                            <Text color="dimmed">{training.name} </Text>
                                            <Group>
                                                {training.tags.map((tag) => (
                                                    <Badge>{tag}</Badge>
                                                ))}
                                            </Group>
                                        </Stack>
                                    );
                                })}
                            </Stack>
                        </Timeline.Item>
                    );
                })}
            </Timeline>
            <CreateTrainingModal opened={opened} onClose={() => setOpened(false)} />
        </PageWrapper>
    );
}
