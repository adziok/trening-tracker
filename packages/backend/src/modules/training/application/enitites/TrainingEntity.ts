import { DateUtils, Entity, ok, Result, UniqueEntityId } from '../../../../shared/classes';

export type TTrainingEntityProps = {
    accountId: UniqueEntityId;
    name: string;
    startedAt: Date;
};

export class TrainingEntity extends Entity<TTrainingEntityProps> {
    static create(props: TTrainingEntityProps): Result<TrainingEntity> {
        return ok(new TrainingEntity(props, UniqueEntityId.generate()));
    }

    static createStartedNow(props: Omit<TTrainingEntityProps, 'startedAt'>): Result<TrainingEntity> {
        return ok(new TrainingEntity({ ...props, startedAt: DateUtils.now() }, UniqueEntityId.generate()));
    }

    static recreate(props: TTrainingEntityProps, id: UniqueEntityId): TrainingEntity {
        return new TrainingEntity(props, id);
    }
}
