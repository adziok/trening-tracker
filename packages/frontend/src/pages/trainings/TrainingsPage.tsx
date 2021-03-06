import React, { useEffect, useState } from 'react';
import { ActionIcon, Badge, Group, Stack, Text, Timeline, UnstyledButton } from '@mantine/core';
import { PageWrapper } from '../../components';
import { CreateTrainingModal } from './CreateTrainingModal';
import { groupBy } from './GroupByUtil';
import dayjs from 'dayjs';
import { useTrainingList } from '../../hooks';
import { ITrainingDto } from '@trening-tracker/shared';
import { useNavigate } from 'react-router-dom';
import { Links } from '../../routes/Links';
import { FloatingButton } from '../../components/FloatingButton';
import { Edit, Plus } from 'tabler-icons-react';
import { UpdateTrainingModal } from './UpdateTrainingModal';

export function TrainingsPage() {
    const navigate = useNavigate();
    const [createTrainingDialogOpened, setCreateTrainingDialogOpened] = useState(false);
    const [updateTrainingDialog, setUpdateTrainingDialog] = useState<ITrainingDto | null>(null);
    const [trainingsGroupedByStartedAt, setTrainingsGroupedByStartedAt] = useState<Record<string, ITrainingDto[]>>({});
    const { data, isLoading, refetch } = useTrainingList();

    const navigateToTraining = (id: string) => navigate(`${Links.TRAININGS}/${id}`);

    useEffect(() => {
        if (data) {
            const trainingsGroupedByStartedAt = groupBy(data.nodes, 'startedAt');
            setTrainingsGroupedByStartedAt(trainingsGroupedByStartedAt);
        }
    }, [data]);

    return (
        <PageWrapper>
            <Timeline bulletSize={24} lineWidth={2} className={'mt-3 mb-10'} active={Infinity}>
                {Object.entries(trainingsGroupedByStartedAt).map(([date, trainingsInDay]) => {
                    return (
                        <Timeline.Item
                            title={
                                <Text size="sm" color="dimmed" className={'pl-6'}>
                                    {dayjs(date).format('YYYY-MM-DD')}
                                </Text>
                            }
                            className={'pl-0'}
                            color={'violet'}
                        >
                            <Stack spacing={5}>
                                {trainingsInDay.map((training) => {
                                    return (
                                        <Group
                                            spacing={1}
                                            className={'rounded-md rounded-l-none shadow-md bg-white'}
                                            noWrap={true}
                                        >
                                            <Stack spacing={'xs'} align={'center'}>
                                                <Text color="dimmed" className={'px-2'}>
                                                    17:30
                                                </Text>
                                                <ActionIcon
                                                    variant={'transparent'}
                                                    color={'violet'}
                                                    size={25}
                                                    radius={30}
                                                    onClick={() => setUpdateTrainingDialog(training)}
                                                >
                                                    <Edit size={25} />
                                                </ActionIcon>
                                            </Stack>
                                            <UnstyledButton
                                                onClick={() => navigateToTraining(training.id)}
                                                className={'flex-1'}
                                            >
                                                <Stack
                                                    spacing={'xs'}
                                                    className={
                                                        'border-0 border-l-2 border-solid border-gray-50 py-3 px-2 '
                                                    }
                                                >
                                                    <Text color="dimmed" className={''}>
                                                        {training.name}{' '}
                                                    </Text>
                                                    <Group>
                                                        {['chest'].map((tag) => (
                                                            <Badge color={'violet'}>{tag}</Badge>
                                                        ))}
                                                    </Group>
                                                </Stack>
                                            </UnstyledButton>
                                        </Group>
                                    );
                                })}
                            </Stack>
                        </Timeline.Item>
                    );
                })}
            </Timeline>

            <FloatingButton>
                <ActionIcon
                    variant={'light'}
                    className={'opacity-70 shadow-lg'}
                    color={'violet'}
                    size={60}
                    radius={100}
                    onClick={() => setCreateTrainingDialogOpened(true)}
                >
                    <Plus size={50} />
                </ActionIcon>
            </FloatingButton>

            <CreateTrainingModal
                opened={createTrainingDialogOpened}
                onClose={() => setCreateTrainingDialogOpened(false)}
                onSave={() => {
                    void refetch();
                }}
            />

            <UpdateTrainingModal
                training={updateTrainingDialog}
                onClose={() => setUpdateTrainingDialog(null)}
                onSave={() => {
                    void refetch();
                }}
            />
        </PageWrapper>
    );
}
