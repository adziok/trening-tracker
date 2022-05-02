import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseRepository } from '../../application/repositories/ExerciseRepository';
import { ExerciseEntity, TExerciseEntityProps } from '../../application/enitites/ExerciseEntity';
import { LocalFileDatabase } from '../../../../shared/LocalFileDatabase';

export class LocalMemoryExerciseRepository implements ExerciseRepository {
    private db = new LocalFileDatabase<TExerciseEntityProps>('exercises');

    getById(id: UniqueEntityId): Promise<ExerciseEntity | null> {
        return Promise.resolve(
            (this.db.data[id.toString()] && ExerciseEntity.recreate(this.db.data[id.toString()], id)) || null
        );
    }

    save(entity: ExerciseEntity): Promise<void> {
        this.db.data[entity.id.toString()] = entity.props;
        this.db.save();
        return Promise.resolve();
    }

    removeById(id: UniqueEntityId): Promise<void> {
        delete this.db[id.toString()];
        this.db.save();
        return Promise.resolve();
    }
}
