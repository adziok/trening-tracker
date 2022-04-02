import { Entity } from '../../../../shared/classes';
import { BaseRecord } from './TrainingRecord';
import { instanceToPlain, plainToInstance } from 'class-transformer';

type Constructable<T> = {
    new (): T;
};
type ConstructableEntity<T> = {
    createInstance(): T;
};

/**
 * const transfer = new EntityRecordTransformer(TrainingEntity, TrainingRecord);
 * const x = transfer.entityToRecord(entity);
 * console.log(x);
 * const a = transfer.recordToEntity(x);
 * console.log(a);
 */
export class EntityRecordTransformer<TEntity extends Entity<Record<string, unknown>>, TRecord extends BaseRecord> {
    constructor(private entity: ConstructableEntity<TEntity>, private record: Constructable<TRecord>) {}

    entityToRecord(entity: TEntity) {
        const recordInstance = Object.assign(
            new this.record(),
            { ...entity.props, id: entity.id },
            { ignoreDecorators: true }
        );
        return instanceToPlain(recordInstance) as TRecord;
    }

    recordToEntity(recordPlain: TRecord): TEntity {
        const { id, ...props } = plainToInstance(this.record, recordPlain);
        return Object.assign(this.entity.createInstance(), { _id: id, props });
    }
}
