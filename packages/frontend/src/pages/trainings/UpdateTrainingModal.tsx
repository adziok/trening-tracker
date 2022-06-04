import React, { useEffect } from 'react';
import { Box, Button, Drawer, Group, LoadingOverlay, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { ITrainingDto, IUpdateTrainingDto } from '@trening-tracker/shared';
import { updateTrainingMutation } from '../../hooks';
import { showNotification } from '@mantine/notifications';

export const emptyCb = () => {
    return;
};

export type CreateTrainingModalProps = {
    training: ITrainingDto | null;
    onClose: () => void;
    onSave: () => void;
};

export function UpdateTrainingModal({ training, onClose = emptyCb, onSave = emptyCb }: CreateTrainingModalProps) {
    if (training === null) return null;
    const form = useForm<IUpdateTrainingDto>({
        initialValues: training,
    });
    const { mutate: updateTraining, isLoading, isError, status } = updateTrainingMutation();

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
        <Drawer position="bottom" opened={training !== null} withCloseButton={false} onClose={onClose}>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <LoadingOverlay visible={isLoading} />
                <form onSubmit={form.onSubmit((values) => updateTraining(values))}>
                    <Text size={'xl'} className="pt-2">
                        Update training:
                    </Text>
                    <TextInput required label="Title" placeholder="Training name" {...form.getInputProps('name')} />
                    <DatePicker
                        required
                        label="Training date"
                        placeholder="Training date"
                        defaultValue={new Date()}
                        {...form.getInputProps('startedAt')}
                    />

                    <Group position="apart" mt="md">
                        <Button color={'red'} variant={'light'} onClick={onClose} loading={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant={'light'} loading={isLoading}>
                            Update
                        </Button>
                    </Group>
                </form>
            </Box>
        </Drawer>
    );
}
