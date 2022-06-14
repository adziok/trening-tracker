import { DateUtils, Entity, UniqueEntityId } from '../../../../shared/classes';
import { ExerciseEntity } from './ExerciseEntity';
import { BadRequestException } from '@nestjs/common';

export type TTrainingEntityProps = {
    accountId: UniqueEntityId;
    name: string;
    exercises: ExerciseEntity[];
    startedAt: Date;
};

export class TrainingEntity extends Entity<TTrainingEntityProps> {
    static create(props: TTrainingEntityProps): TrainingEntity {
        return new TrainingEntity(props, UniqueEntityId.generate());
    }

    static createStartedNow(props: Omit<TTrainingEntityProps, 'startedAt'>): TrainingEntity {
        return new TrainingEntity({ ...props, startedAt: DateUtils.now() }, UniqueEntityId.generate());
    }

    static recreate(props: TTrainingEntityProps, id: UniqueEntityId): TrainingEntity {
        return new TrainingEntity(props, id);
    }

    update({ name, startedAt }: Partial<Omit<TTrainingEntityProps, 'accountId'>>): TrainingEntity {
        this.props.name = name ?? this.props.name;
        this.props.startedAt = startedAt ?? this.props.startedAt;

        return this;
    }

    addExercise(exercise: ExerciseEntity) {
        const alreadyExists = this.props.exercises.find((anExercise) => anExercise.id.equals(exercise.id));
        if (alreadyExists) return;
        this.props.exercises.push(exercise);
    }

    removeExercise(exercise: ExerciseEntity) {
        const alreadyExists = this.props.exercises.find((anExercise) => anExercise.id.equals(exercise.id));
        if (!alreadyExists) throw new BadRequestException('Series does not exists in given training');
        this.props.exercises = this.props.exercises.filter((anExercise) => !anExercise.id.equals(exercise.id));
    }
}
