import { TrainingRepository } from '../../application/repositories/TrainingRepository';
import { TrainingEntity, TTrainingEntityProps } from '../../application/enitites/TrainingEntity';
import { UniqueEntityId } from '../../../../shared/classes';
import { LocalFileDatabase } from '../../../../shared/LocalFileDatabase';

export class InMemoryTrainingRepository implements TrainingRepository {
    private db = new LocalFileDatabase<TTrainingEntityProps>('exercises');

    getById(id: UniqueEntityId): Promise<TrainingEntity | null> {
        return Promise.resolve(
            (this.db.data[id.toString()] && TrainingEntity.recreate(this.db.data[id.toString()], id)) || null
        );
    }

    getByIdAndAccountId(trainingId: UniqueEntityId, accountId: UniqueEntityId): Promise<TrainingEntity | null> {
        if (this.db.data[trainingId.toString()] && this.db.data[trainingId.toString()].accountId.equals(accountId)) {
            return Promise.resolve(TrainingEntity.recreate(this.db.data[trainingId.toString()], trainingId));
        }
        return Promise.resolve<null>(null);
    }

    save(entity: TrainingEntity): Promise<void> {
        this.db.data[entity.id.toString()] = entity.props;
        this.db.save();
        return Promise.resolve();
    }
}
