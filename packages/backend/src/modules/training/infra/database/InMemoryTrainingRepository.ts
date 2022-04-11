import { TrainingRepository } from '../../application/repositories/TrainingRepository';
import { TrainingEntity } from '../../application/enitites/TrainingEntity';
import { UniqueEntityId } from '../../../../shared/classes';
import { EntityRecordTransformer } from './EntityRecordTransformer';
import { TrainingRecord } from './TrainingRecord';

export class InMemoryTrainingRepository implements TrainingRepository {
    constructor(private data: Record<string, TrainingRecord> = {}) {}
    private transformer = new EntityRecordTransformer<TrainingEntity, TrainingRecord>(
        TrainingEntity as any,
        TrainingRecord
    );

    getById(id: UniqueEntityId): Promise<TrainingEntity | null> {
        return Promise.resolve(
            (this.data[id.toString()] && this.transformer.recordToEntity(this.data[id.toString()])) || null
        );
    }

    getByIdAndAccountId(trainingId: UniqueEntityId, accountId: UniqueEntityId): Promise<TrainingEntity | null> {
        if (this.data[trainingId.toString()] && this.data[trainingId.toString()].accountId === accountId.toString()) {
            return Promise.resolve(this.transformer.recordToEntity(this.data[trainingId.toString()]));
        }
        return Promise.resolve<null>(null);
    }

    save(entity: TrainingEntity): Promise<void> {
        this.data[entity.id.toString()] = this.transformer.entityToRecord(entity);
        return Promise.resolve();
    }
}
