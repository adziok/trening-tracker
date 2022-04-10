import React, { useEffect, useState } from 'react';
import { Box, Button, Drawer, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { ICreateTrainingDto } from '@trening-tracker/shared';
import { PageWrapper } from '../components';
import { createTrainingMutation } from '../hooks';

export function PlaygroundPage() {
    const [opened, setOpened] = useState(false);
    const form = useForm<ICreateTrainingDto>({
        initialValues: {
            name: '',
            startedAt: undefined,
        },
    });
    const { mutate, isLoading, isSuccess, isError } = createTrainingMutation();

    useEffect(() => {
        if (!isLoading && isSuccess) {
            console.log('Success');
            form.reset();
            setOpened(false);
        }
        if (!isLoading && isError) {
            console.log('Error');
        }
    }, [isLoading]);

    const createTraining = (data: ICreateTrainingDto) => {
        mutate(data);
    };

    return (
        <PageWrapper>
            <Button onClick={() => setOpened(true)}>Create training</Button>
            <Drawer position="bottom" opened={opened} withCloseButton={false} onClose={() => setOpened(false)}>
                <Box sx={{ maxWidth: 300 }} mx="auto">
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
                            <Button
                                color={'red'}
                                variant={'light'}
                                onClick={() => setOpened(false)}
                                loading={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant={'light'} loading={isLoading}>
                                Submit
                            </Button>
                        </Group>
                    </form>
                </Box>
            </Drawer>
        </PageWrapper>
    );
}
