import { ExerciseEntity } from './ExerciseEntity';
import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseSeriesEntity } from './ExerciseSeriesEntity';

describe('ExerciseEntity', () => {
    it('should create an instance of the object using factory method', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });
        expect(instance.props).toEqual(
            expect.objectContaining({
                name: 'First training',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                trainingId: expect.any(UniqueEntityId),
            })
        );
    });

    it('should add a series to the training', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });

        const series = ExerciseSeriesEntity.create({
            reps: 10,
            weight: 50,
        });
        instance.addSeries(series);

        expect(instance.props.series).toHaveLength(1);
    });

    it('should ignore duplicates when we add series', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });

        const series = ExerciseSeriesEntity.create({
            reps: 10,
            weight: 50,
        });
        instance.addSeries(series);
        instance.addSeries(series);

        expect(instance.props.series).toHaveLength(1);
    });

    it('should remove a series from the training ', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });

        const series = ExerciseSeriesEntity.create({
            reps: 10,
            weight: 50,
        });
        instance.addSeries(series);

        instance.removeSeries(series);

        expect(instance.props.series).toHaveLength(0);
    });

    it('should throw when trying to remove not existing series', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });

        const series = ExerciseSeriesEntity.create({
            reps: 10,
            weight: 50,
        });

        expect(() => instance.removeSeries(series)).toThrow();
    });
});
