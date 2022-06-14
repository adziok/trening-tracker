import { BadRequestException } from '@nestjs/common';
import { Entity, UniqueEntityId } from '../../../../shared/classes';
import { ExerciseSeriesEntity } from './ExerciseSeriesEntity';

export type TExerciseEntityProps = {
    series: ExerciseSeriesEntity[];
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

    addSeries(series: ExerciseSeriesEntity) {
        const alreadyExists = this.props.series.find((aSeries) => aSeries.id.equals(series.id));
        if (alreadyExists) return;
        this.props.series.push(series);
    }

    removeSeries(series: ExerciseSeriesEntity) {
        const alreadyExists = this.props.series.find((aSeries) => aSeries.id.equals(series.id));
        if (!alreadyExists) throw new BadRequestException('Series does not exists in given training');
        this.props.series = this.props.series.filter((aSeries) => !aSeries.id.equals(series.id));
    }
}
