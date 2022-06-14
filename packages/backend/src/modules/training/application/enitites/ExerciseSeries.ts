import { Entity, UniqueEntityId } from '../../../../shared/classes';

export type TExerciseSeriesProps = {
    weight: number;
    reps: number;
};

export class ExerciseSeries extends Entity<TExerciseSeriesProps> {
    static create(props: TExerciseSeriesProps) {
        return new ExerciseSeries(props, UniqueEntityId.generate());
    }

    static recreate(props: TExerciseSeriesProps, id: UniqueEntityId): ExerciseSeries {
        return new ExerciseSeries(props, id);
    }
}
