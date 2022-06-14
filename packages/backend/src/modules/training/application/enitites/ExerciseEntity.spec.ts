import { ExerciseEntity } from './ExerciseEntity';
import { UniqueEntityId } from '../../../../shared/classes';
import { ExerciseSeries } from './ExerciseSeries';

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

        const series = ExerciseSeries.create({
            reps: 10,
            weight: 50,
        });
        instance.addSeries(series);

        expect(instance.props.series).toHaveLength(1);
    });

    it('should remove a series from the training ', () => {
        const instance = ExerciseEntity.create({ name: 'First training', trainingId: UniqueEntityId.generate() });

        const series = ExerciseSeries.create({
            reps: 10,
            weight: 50,
        });
        instance.addSeries(series);

        instance.removeSeries(series);

        expect(instance.props.series).toHaveLength(0);
    });
});
