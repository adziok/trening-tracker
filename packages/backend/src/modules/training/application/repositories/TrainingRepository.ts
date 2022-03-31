import { UniqueEntityId } from '../../../../shared/classes';
import { TrainingEntity } from '../enitites/TrainingEntity';

export abstract class TrainingRepository {
    abstract getById(id: UniqueEntityId): Promise<TrainingEntity | null>;
    abstract save(entity: TrainingEntity): Promise<void>;
    abstract getByIdAndAccountId(trainingId: UniqueEntityId, accountId: UniqueEntityId): Promise<TrainingEntity | null>;
}
