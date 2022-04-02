import { Transform } from 'class-transformer';
import { UniqueEntityId } from '../../../../shared/classes';
import { TTrainingEntityProps } from '../../application/enitites/TrainingEntity';

export class BaseRecord {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    id: string;
}

export class TrainingRecord extends BaseRecord implements Record<keyof TTrainingEntityProps, unknown> {
    @Transform(({ value }: { value: string }) => UniqueEntityId.recreate(value), { toClassOnly: true })
    @Transform(({ value }: { value: UniqueEntityId }) => value.toValue(), { toPlainOnly: true })
    accountId: string;

    name: string;

    startedAt: Date;
}
