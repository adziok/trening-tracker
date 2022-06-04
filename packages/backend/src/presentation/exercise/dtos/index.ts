import { ICreateExerciseInTrainingDto, IRemoveExerciseFromTrainingDto } from '@trening-tracker/shared';

export class CreateExerciseInTrainingDto implements ICreateExerciseInTrainingDto {
    name: string;
    trainingId: string;
}

export class RemoveExerciseFromTrainingDto implements IRemoveExerciseFromTrainingDto {
    exerciseId: string;
    trainingId: string;
}
