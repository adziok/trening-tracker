import React, { useEffect } from 'react';
import { Box, Button, Drawer, Group, LoadingOverlay, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createTrainingExerciseMutation } from '../../hooks';
import { showNotification } from '@mantine/notifications';
import { ICreateExerciseInTrainingDto } from '@trening-tracker/shared';

export const emptyCb = () => {
    return;
};

export type CreateTrainingExerciseModalProps = {
    opened: boolean;
    trainingId: string;
    onClose: () => void;
    onSave: () => void;
};

export function CreateTrainingExerciseModal({
    opened,
    onClose = emptyCb,
    onSave = emptyCb,
    trainingId,
}: CreateTrainingExerciseModalProps) {
    const form = useForm<ICreateExerciseInTrainingDto>({
        initialValues: {
            name: '',
            trainingId,
        },
    });
    const { mutate: createTrainingExercise, isLoading, isError, status, error } = createTrainingExerciseMutation();

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
                <form onSubmit={form.onSubmit((values) => createTrainingExercise(values))}>
                    <Text size={'xl'} className="pt-2">
                        Create exercise in training:
                    </Text>
                    <TextInput required label="Name" placeholder="Exercise name" {...form.getInputProps('name')} />

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
