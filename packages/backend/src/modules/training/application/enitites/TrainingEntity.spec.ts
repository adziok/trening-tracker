import { DateUtils, UniqueEntityId } from '../../../../shared/classes';
import { TrainingEntity } from './TrainingEntity';
import { ExerciseEntity } from './ExerciseEntity';

const createEmptyTraining = (name: string) =>
    TrainingEntity.create({
        name,
        startedAt: DateUtils.now(),
        exercises: [],
        accountId: UniqueEntityId.generate(),
    });

describe('TrainingEntity', () => {
    it('should create an instance of the object using factory method', () => {
        const instance = createEmptyTraining('First training');
        expect(instance.props).toEqual(
            expect.objectContaining({
                name: 'First training',
            })
        );
    });

    it('should add a exercise to the training', () => {
        const instance = createEmptyTraining('First training');

        const exercise = ExerciseEntity.create({ name: 'Exercise', trainingId: instance.id });
        instance.addExercise(exercise);

        expect(instance.props.exercises).toHaveLength(1);
    });

    it('should ignore duplicates when we add exercises', () => {
        const instance = createEmptyTraining('First training');

        const exercise = ExerciseEntity.create({ name: 'Exercise', trainingId: instance.id });
        instance.addExercise(exercise);
        instance.addExercise(exercise);

        expect(instance.props.exercises).toHaveLength(1);
    });

    it('should remove a series from the training ', () => {
        const instance = createEmptyTraining('First training');

        const exercise = ExerciseEntity.create({ name: 'Exercise', trainingId: instance.id });
        instance.addExercise(exercise);

        instance.removeExercise(exercise);

        expect(instance.props.exercises).toHaveLength(0);
    });

    it('should throw when trying to remove not existing series', () => {
        const instance = createEmptyTraining('First training');

        const exercise = ExerciseEntity.create({ name: 'Exercise', trainingId: instance.id });

        expect(() => instance.removeExercise(exercise)).toThrow();
    });
});
