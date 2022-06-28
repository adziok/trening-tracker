import React, { useEffect } from 'react';
import { Box, Button, Drawer, Group, LoadingOverlay, NumberInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createTrainingExerciseSeriesMutation } from '../../hooks';
import { showNotification } from '@mantine/notifications';
import { IAddSeriesToExerciseDto } from '@trening-tracker/shared';

export const emptyCb = () => {
    return;
};

export type CreateTrainingExerciseSeriesModalProps = {
    opened: boolean;
    trainingId: string;
    exerciseId: string;
    onClose: () => void;
    onSave: () => void;
};

export function CreateTrainingExerciseSeriesModal({
    opened,
    onClose = emptyCb,
    onSave = emptyCb,
    trainingId,
    exerciseId,
}: CreateTrainingExerciseSeriesModalProps) {
    const form = useForm<IAddSeriesToExerciseDto>({
        initialValues: {
            trainingId,
            exerciseId,
            weight: 0,
            reps: 0,
        },
    });
    const {
        mutate: createTrainingExerciseSeries,
        isLoading,
        isError,
        status,
        error,
    } = createTrainingExerciseSeriesMutation();

    useEffect(() => {
        if (!isLoading && status === 'success') {
            form.reset();
            onSave();
            onClose();
        }
        if (!isLoading && isError) {
            showNotification({
                message: 'Error occurred',
                autoClose: 2500,
                color: 'red',
            });
        }
    }, [isLoading]);

    return (
        <Drawer position="bottom" opened={opened} withCloseButton={false} onClose={onClose}>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <LoadingOverlay visible={isLoading} />
                <form onSubmit={form.onSubmit((values) => createTrainingExerciseSeries(values))}>
                    <Text size={'xl'} className="pt-2">
                        Add series to exercise:
                    </Text>
                    <NumberInput
                        required
                        label="Repetitions"
                        placeholder="Repetitions"
                        {...form.getInputProps('reps')}
                    />
                    <NumberInput required label="Weight" placeholder="Weight" {...form.getInputProps('weight')} />

                    <Group position="apart" mt="md">
                        <Button color={'red'} variant={'light'} onClick={onClose} loading={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant={'light'} loading={isLoading}>
                            Submit
                        </Button>
                    </Group>
                </form>
            </Box>
        </Drawer>
    );
}
