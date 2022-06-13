import { DateUtils, Entity, UniqueEntityId } from '../../../../shared/classes';

export type TTrainingEntityProps = {
    accountId: UniqueEntityId;
    name: string;
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
}
