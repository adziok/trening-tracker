import { Entity, UniqueEntityId } from '../../../../shared/classes';
import { ExerciseSeries } from './ExerciseSeries';

export type TExerciseEntityProps = {
    series: ExerciseSeries[];
    trainingId: UniqueEntityId;
    name: string;
};

export class ExerciseEntity extends Entity<TExerciseEntityProps> {
    static create(props: Omit<TExerciseEntityProps, 'series'>): ExerciseEntity {
        return new ExerciseEntity({ ...props, series: [] }, UniqueEntityId.generate());
    }

    static recreate(props: TExerciseEntityProps, id: UniqueEntityId): ExerciseEntity {
        return new ExerciseEntity(props, id);
    }

    addSeries(series: ExerciseSeries) {
        this.props.series.push(series);
    }

    removeSeries(series: ExerciseSeries) {
        this.props.series = this.props.series.filter((aSeries) => !aSeries.id.equals(series.id));
    }
}
