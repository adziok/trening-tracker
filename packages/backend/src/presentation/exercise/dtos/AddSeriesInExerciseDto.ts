import { IAddSeriesToExerciseDto } from '@trening-tracker/shared';

export class AddSeriesInExerciseDto implements Omit<IAddSeriesToExerciseDto, 'exerciseId' | 'trainingId'> {
    reps: number;
    weight: number;
}
