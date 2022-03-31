import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseRepository } from '../../application/repositories/ExerciseRepository';
import { ExerciseEntity, TExerciseEntityProps } from '../../application/enitites/ExerciseEntity';

export class InMemoryExerciseRepository implements ExerciseRepository {
    private data: Record<string, TExerciseEntityProps> = {};

    getById(id: UniqueEntityId): Promise<ExerciseEntity | null> {
        return Promise.resolve(
            (this.data[id.toString()] && ExerciseEntity.recreate(this.data[id.toString()], id)) || null
        );
    }

    save(entity: ExerciseEntity): Promise<void> {
        this.data[entity.id.toString()] = entity.props;
        return Promise.resolve();
    }
}
