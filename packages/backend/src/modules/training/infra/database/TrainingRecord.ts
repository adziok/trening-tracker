import { Transform } from 'class-transformer';
import { UniqueEntityId } from '../../../../shared/classes';
import { TTrainingEntityProps } from '../../application/enitites/TrainingEntity';
import { TExerciseEntityProps } from '../../application/enitites/ExerciseEntity';
import { ExerciseSeriesEntity, TExerciseSeriesProps } from '../../application/enitites/ExerciseSeriesEntity';
import { EntityRecordTransformer } from './EntityRecordTransformer';

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

export class ExerciseSeriesRecord extends BaseRecord implements Record<keyof TExerciseSeriesProps, unknown> {
    reps: number;
    weight: number;
}

export class ExerciseRecord extends BaseRecord implements Record<keyof TExerciseEntityProps, unknown> {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    trainingId: string;

    name: string;
    @Transform(
        ({ value }: { value: ExerciseSeriesRecord[] }) => {
            return value.map((v) =>
                EntityRecordTransformer.recordToEntity(v, ExerciseSeriesRecord, ExerciseSeriesEntity)
            );
        },
        { toClassOnly: true }
    )
    @Transform(
        ({ value }: { value: ExerciseSeriesEntity[] }) => {
            return value.map((v) => EntityRecordTransformer.entityToRecord(v, ExerciseSeriesRecord));
        },
        { toPlainOnly: true }
    )
    series: unknown[];
}
