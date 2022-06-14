import { Entity, UniqueEntityId } from '../../../../shared/classes';

export type TExerciseSeriesProps = {
    weight: number;
    reps: number;
};

export class ExerciseSeriesEntity extends Entity<TExerciseSeriesProps> {
    static create(props: TExerciseSeriesProps) {
        return new ExerciseSeriesEntity(props, UniqueEntityId.generate());
    }

    static recreate(props: TExerciseSeriesProps, id: UniqueEntityId): ExerciseSeriesEntity {
        return new ExerciseSeriesEntity(props, id);
    }
}
