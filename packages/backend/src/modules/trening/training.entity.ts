import { ChangeTrainingDate, ChangeTrainingName, CreateTraining } from './events';
import { randomUUID } from 'crypto';

export type Training = Readonly<{
    id: string;
    name: string;
    trainingStartedAt: Date;
    deletedAt: Date | null;
}>;

export type TrainingEvent = CreateTraining | ChangeTrainingName | ChangeTrainingDate;

export function when(currentState: Partial<Training>, event: TrainingEvent): Partial<Training> {
    switch (event.type) {
        case 'create-training': {
            return {
                id: randomUUID(),
                deletedAt: null,
                name: event.data.name,
                trainingStartedAt: event.data.trainingStartedAt,
            };
        }
        case 'change-training-date':
            return {
                ...currentState,
                trainingStartedAt: event.data.trainingStartedAt,
            };
        case 'change-training-name': {
            return {
                ...currentState,
                name: event.data.name,
            };
        }
        default:
            throw 'Unexpected event type';
    }
}

export function isTraining(invoice: Partial<Training>): invoice is Training {
    return !!invoice.name && !!invoice.trainingStartedAt && !!invoice.id;
}
