import { Entity, UniqueEntityId } from '../../../../shared/classes';

export type TExerciseEntityProps = {
    trainingId: UniqueEntityId;
    name: string;
};

export class ExerciseEntity extends Entity<TExerciseEntityProps> {
    static create(props: TExerciseEntityProps): ExerciseEntity {
        return new ExerciseEntity(props, UniqueEntityId.generate());
    }

    static recreate(props: TExerciseEntityProps, id: UniqueEntityId): ExerciseEntity {
        return new ExerciseEntity(props, id);
    }
}
