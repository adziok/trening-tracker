import React, { useEffect } from 'react';
import { Box, Button, Drawer, Group, LoadingOverlay, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { ICreateTrainingDto } from '@trening-tracker/shared';
import { createTrainingMutation } from '../../hooks';
import { showNotification } from '@mantine/notifications';

export const emptyCb = () => {
    return;
};

export type CreateTrainingModalProps = {
    opened: boolean;
    onClose: () => void;
    onSave: () => void;
};

export function CreateTrainingModal({ opened, onClose = emptyCb, onSave = emptyCb }: CreateTrainingModalProps) {
    const form = useForm<ICreateTrainingDto>({
        initialValues: {
            name: '',
            startedAt: undefined,
        },
    });
    const { mutate: createTraining, isLoading, isError, status, error } = createTrainingMutation();

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
                <form onSubmit={form.onSubmit((values) => createTraining(values))}>
                    <Text size={'xl'} className="pt-2">
                        Create new training:
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
                            Submit
                        </Button>
                    </Group>
                </form>
            </Box>
        </Drawer>
    );
}
