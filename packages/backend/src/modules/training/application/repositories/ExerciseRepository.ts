import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseEntity } from '../enitites/ExerciseEntity';

export abstract class ExerciseRepository {
    abstract getById(id: UniqueEntityId): Promise<ExerciseEntity | null>;
    abstract save(entity: ExerciseEntity): Promise<void>;
}
