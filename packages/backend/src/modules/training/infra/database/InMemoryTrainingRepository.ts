import { TrainingRepository } from '../../application/repositories/TrainingRepository';
import { TrainingEntity, TTrainingEntityProps } from '../../application/enitites/TrainingEntity';
import { UniqueEntityId } from '../../../../shared/classes';

export class InMemoryTrainingRepository implements TrainingRepository {
    private data: Record<string, TTrainingEntityProps> = {};

    getById(id: UniqueEntityId): Promise<TrainingEntity | null> {
        return Promise.resolve(
            (this.data[id.toString()] && TrainingEntity.recreate(this.data[id.toString()], id)) || null
        );
    }

    getByIdAndAccountId(trainingId: UniqueEntityId, accountId: UniqueEntityId): Promise<TrainingEntity | null> {
        return Promise.resolve(
            (this.data[trainingId.toString()] &&
                this.data[trainingId.toString()].accountId.equals(accountId) &&
                TrainingEntity.recreate(this.data[trainingId.toString()], trainingId)) ||
                null
        );
    }

    save(entity: TrainingEntity): Promise<void> {
        this.data[entity.id.toString()] = entity.props;
        return Promise.resolve();
    }
}
