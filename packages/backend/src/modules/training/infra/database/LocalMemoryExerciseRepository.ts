import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseRepository } from '../../application/repositories/ExerciseRepository';
import { ExerciseEntity } from '../../application/enitites/ExerciseEntity';
import { LocalFileDatabase } from '../../../../shared/LocalFileDatabase';
import { EntityRecordTransformer } from './EntityRecordTransformer';
import { ExerciseRecord } from './TrainingRecord';

export class LocalMemoryExerciseRepository implements ExerciseRepository {
    private db = new LocalFileDatabase<ExerciseRecord>('exercises');
    private transformer = new EntityRecordTransformer<ExerciseEntity, ExerciseRecord>(
        ExerciseEntity as any,
        ExerciseRecord
    );

    getById(id: UniqueEntityId): Promise<ExerciseEntity | null> {
        return Promise.resolve(
            (this.db.data[id.toString()] && this.transformer.recordToEntity(this.db.data[id.toString()])) || null
        );
    }

    save(entity: ExerciseEntity): Promise<void> {
        this.db.data[entity.id.toString()] = this.transformer.entityToRecord(entity);
        this.db.save();
        return Promise.resolve();
    }

    removeById(id: UniqueEntityId): Promise<void> {
        delete this.db.data[id.toString()];
        this.db.save();
        return Promise.resolve();
    }
}
