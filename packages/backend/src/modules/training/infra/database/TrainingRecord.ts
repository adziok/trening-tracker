import { Expose, Transform } from 'class-transformer';
import { UniqueEntityId } from '../../../../shared/classes';
import { TTrainingEntityProps } from '../../application/enitites/TrainingEntity';

export class BaseRecord {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    id: string;
}

// TODO check how Expose will work with database serialization
export class TrainingRecord extends BaseRecord implements Record<keyof TTrainingEntityProps, unknown> {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    @Expose({ toPlainOnly: true, name: 'account_id' })
    accountId: string;

    name: string;

    @Expose({ toPlainOnly: true, name: 'started_at' })
    startedAt: Date;
}
