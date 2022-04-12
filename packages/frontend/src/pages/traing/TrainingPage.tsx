import React from 'react';
import { Accordion, ActionIcon, Group, LoadingOverlay, Text, ThemeIcon } from '@mantine/core';
import { ChevronLeft, Palette } from 'tabler-icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageWrapper } from '../../components';
import { useTraining } from '../../hooks';

function AccordionLabel({ label }: { label: string }) {
    return (
        <Group noWrap>
            <div className={'ml-3'}>
                <Text weight={300}>{label}</Text>
            </div>
        </Group>
    );
}

export function TrainingPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useTraining(id!);

    return (
        <PageWrapper noSidePaddings={true}>
            <LoadingOverlay visible={isLoading} />

            <Group className={'p-2 f'} noWrap={true}>
                <ActionIcon size={'lg'} color={'violet'} onClick={() => navigate(-1)}>
                    <ChevronLeft size={36} />
                </ActionIcon>
                <Text size={'xl'}>{data?.name}</Text>
            </Group>

            {/*<Divider my="sm" clas sName={'m-0'} />*/}

            <Accordion multiple={true} disableIconRotation={true} className={'mt-3'}>
                {new Array(6).fill('').map(() => (
                    <Accordion.Item
                        icon={
                            <ThemeIcon color="violet" variant="light">
                                <Palette size={18} />
                            </ThemeIcon>
                        }
                        label={<AccordionLabel label={'Bench Press'} />}
                        classNames={{
                            control: 'py-2',
                        }}
                    >
                        Colors, fonts, shadows an d many other parts are customizable to fit your design needs
                    </Accordion.Item>
                ))}
            </Accordion>
            {!isLoading && error && 'ERROR OCCURRED '}
        </PageWrapper>
    );
}
