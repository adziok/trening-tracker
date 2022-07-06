import { IRemoveExerciseFromTrainingDto } from '@trening-tracker/shared';

export class RemoveExerciseFromTrainingDto implements IRemoveExerciseFromTrainingDto {
    exerciseId: string;
    trainingId: string;
}
