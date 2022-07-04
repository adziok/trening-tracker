import React, { useState } from 'react';
import { Accordion, ActionIcon, Badge, Button, Divider, Group, LoadingOverlay, Paper, Text } from '@mantine/core';
import { ChevronLeft, Plus, Repeat, Trash } from 'tabler-icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../../components';
import { removeTrainingExerciseMutation, useTraining, useTrainingExercisesList } from '../../hooks';
import { FloatingButton } from '../../components/FloatingButton';
import { CreateTrainingExerciseModal } from './CreateTrainingExerciseModal';
import { CreateTrainingExerciseSeriesModal } from './CreateTrainingExerciseSeriesModal';

export function TrainingPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useTraining(id!);
    const { data: trainingExercises, refetch } = useTrainingExercisesList(id!);
    const { mutate: removeTrainingExercise } = removeTrainingExerciseMutation();
    const [createTrainingExerciseDialogOpened, setCreateTrainingExerciseDialogOpened] = useState(false);
    const [addToExerciseId, setAddToExerciseId] = useState<string | null>(null);
    const [createTrainingExerciseSeriesDialogOpened, setCreateTrainingExerciseSeriesDialogOpened] = useState(false);

    return (
        <PageWrapper noSidePaddings={true}>
            <LoadingOverlay visible={isLoading} />

            <Group className={'p-2 f'} noWrap={true}>
                <ActionIcon size={'lg'} color={'violet'} onClick={() => navigate(-1)}>
                    <ChevronLeft size={36} />
                </ActionIcon>
                <Text size={'xl'}>{data?.name}</Text>
            </Group>

            <Accordion iconPosition="right" offsetIcon={false} multiple>
                {trainingExercises?.nodes.map((trainingExercise) => (
                    <Accordion.Item
                        key={trainingExercise.id}
                        label={
                            <Group position="apart">
                                <Text weight={500} className={'flex-1'}>
                                    {trainingExercise.name}
                                </Text>
                                <Badge color="violet" variant="light" size={'xs'}>
                                    <Text weight={500} size={'xs'}>
                                        <Repeat size={12} /> {trainingExercise.series.length}
                                    </Text>
                                </Badge>
                                <ActionIcon
                                    size={'lg'}
                                    color={'violet'}
                                    onClick={() =>
                                        removeTrainingExercise(
                                            { trainingId: id!, exerciseId: trainingExercise.id },
                                            {
                                                onSuccess: () => {
                                                    return refetch();
                                                },
                                            }
                                        )
                                    }
                                >
                                    <Trash size={16} />
                                </ActionIcon>
                            </Group>
                        }
                    >
                        <Divider />
                        <Paper shadow="xs" p="xs">
                            {trainingExercise.series?.map((series) => (
                                // <div>{JSON.stringify(series)}</div>
                                <Group position="apart" spacing={0}>
                                    <Badge>Weight: {series.weight} kg</Badge>
                                    <Badge>Reps: {series.reps}</Badge>
                                    <ActionIcon size={'lg'} color={'violet'} onClick={() => console.log('remfing')}>
                                        <Trash size={16} />
                                    </ActionIcon>
                                </Group>
                            ))}
                            <Button
                                variant={'white'}
                                fullWidth
                                onClick={() => (
                                    setAddToExerciseId(trainingExercise.id),
                                    setCreateTrainingExerciseSeriesDialogOpened(true)
                                )}
                                rightIcon={<Plus size={18} />}
                            >
                                Add Series
                            </Button>
                        </Paper>
                    </Accordion.Item>
                ))}
            </Accordion>

            <FloatingButton>
                <ActionIcon
                    variant={'light'}
                    className={'opacity-70 shadow-lg'}
                    color={'violet'}
                    size={60}
                    radius={100}
                    onClick={() => setCreateTrainingExerciseDialogOpened(true)}
                >
                    <Plus size={50} />
                </ActionIcon>
            </FloatingButton>

            <CreateTrainingExerciseModal
                trainingId={id!}
                opened={createTrainingExerciseDialogOpened}
                onClose={() => setCreateTrainingExerciseDialogOpened(false)}
                onSave={() => {
                    void refetch();
                }}
            />

            {addToExerciseId && (
                <CreateTrainingExerciseSeriesModal
                    trainingId={id!}
                    exerciseId={addToExerciseId}
                    opened={createTrainingExerciseSeriesDialogOpened}
                    onClose={() => (setAddToExerciseId(null), setCreateTrainingExerciseSeriesDialogOpened(false))}
                    onSave={() => {
                        void refetch();
                    }}
                />
            )}

            {!isLoading && error && 'ERROR OCCURRED '}
        </PageWrapper>
    );
}
