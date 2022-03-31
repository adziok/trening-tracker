import { Event } from '../../../common';

export type CreateTraining = Event<
    'create-training',
    {
        id: string;
        name: string;
        trainingStartedAt: Date;
        deletedAt: Date | null;
    }
>;

export type ChangeTrainingName = Event<
    'change-training-name',
    {
        id: string;
        name: string;
    }
>;

export type ChangeTrainingDate = Event<
    'change-training-date',
    {
        id: string;
        trainingStartedAt: Date;
    }
>;
