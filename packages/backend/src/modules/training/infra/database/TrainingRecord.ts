import { Transform } from 'class-transformer';
import { UniqueEntityId } from '../../../../shared/classes';
import { TTrainingEntityProps } from '../../application/enitites/TrainingEntity';
import { TExerciseEntityProps } from '../../application/enitites/ExerciseEntity';

export class BaseRecord {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    id: string;
}

// TODO check how Expose will work with database serialization
export class TrainingRecord extends BaseRecord implements Record<keyof TTrainingEntityProps, unknown> {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    accountId: string;

    name: string;

    startedAt: Date;
    exercises: unknown;
}

export class ExerciseRecord extends BaseRecord implements Record<keyof TExerciseEntityProps, unknown> {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    trainingId: string;

    name: string;
    series: unknown;
}
