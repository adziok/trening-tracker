import {
    IAddSeriesToExerciseDto,
    ICreateExerciseInTrainingDto,
    IRemoveExerciseFromTrainingDto,
} from '@trening-tracker/shared';

export class CreateExerciseInTrainingDto implements ICreateExerciseInTrainingDto {
    name: string;
    trainingId: string;
    templateId: string;
}

export class RemoveExerciseFromTrainingDto implements IRemoveExerciseFromTrainingDto {
    exerciseId: string;
    trainingId: string;
}

export class AddSeriesInExerciseDto implements Omit<IAddSeriesToExerciseDto, 'exerciseId' | 'trainingId'> {
    reps: number;
    weight: number;
}
