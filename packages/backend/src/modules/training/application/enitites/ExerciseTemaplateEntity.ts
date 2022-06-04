import { Entity, ok, Result, UniqueEntityId } from '../../../../shared/classes';
import { BadRequestException } from '@nestjs/common';

const isInt = (value: number) => {
    return Number.isInteger(value);
};

type TExerciseProperty = {
    name: string;
    required: boolean;
    type: 'number' | 'time';
    precision: number | null;
};

class ExerciseProperty {
    constructor(private props: TExerciseProperty) {}

    static createNumericProperty(props: Pick<TExerciseProperty, 'required' | 'name' | 'precision'>) {
        if (!isInt(props.precision)) throw new BadRequestException('Precision must be an integer');
        return new ExerciseProperty({
            ...props,
            type: 'number',
        });
    }

    static createTimeProperty(props: Pick<TExerciseProperty, 'required' | 'name'>) {
        return new ExerciseProperty({
            ...props,
            precision: null,
            type: 'time',
        });
    }
}

export type TExerciseEntityProps = {
    id: string;
    scope: 'user' | 'system';
    name: string;
    accountId: string;
    tags: string[];
    properties: TExerciseProperty[];
};

export class ExerciseEntity extends Entity<TExerciseEntityProps> {
    static create(props: TExerciseEntityProps): Result<ExerciseEntity> {
        return ok(new ExerciseEntity(props, UniqueEntityId.generate()));
    }

    static recreate(props: TExerciseEntityProps, id: UniqueEntityId): ExerciseEntity {
        return new ExerciseEntity(props, id);
    }
}
