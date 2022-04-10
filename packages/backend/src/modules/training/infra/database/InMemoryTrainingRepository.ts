import { TrainingRepository } from '../../application/repositories/TrainingRepository';
import { TrainingEntity } from '../../application/enitites/TrainingEntity';
import { UniqueEntityId } from '../../../../shared/classes';
import { LocalFileDatabase } from '../../../../shared/LocalFileDatabase';
import { EntityRecordTransformer } from './EntityRecordTransformer';
import { TrainingRecord } from './TrainingRecord';

export class InMemoryTrainingRepository implements TrainingRepository {
    private db = new LocalFileDatabase<TrainingRecord>('trainings');
    private transformer = new EntityRecordTransformer<TrainingEntity, TrainingRecord>(
        TrainingEntity as any,
        TrainingRecord
    );

    getById(id: UniqueEntityId): Promise<TrainingEntity | null> {
        return Promise.resolve(
            (this.db.data[id.toString()] && this.transformer.recordToEntity(this.db.data[id.toString()])) || null
        );
    }

    getByIdAndAccountId(trainingId: UniqueEntityId, accountId: UniqueEntityId): Promise<TrainingEntity | null> {
        if (
            this.db.data[trainingId.toString()] &&
            this.db.data[trainingId.toString()].accountId === accountId.toString()
        ) {
            return Promise.resolve(this.transformer.recordToEntity(this.db.data[trainingId.toString()]));
        }
        return Promise.resolve<null>(null);
    }

    save(entity: TrainingEntity): Promise<void> {
        this.db.data[entity.id.toString()] = this.transformer.entityToRecord(entity);
        this.db.save();
        return Promise.resolve();
    }
}
