import { ICreateExerciseInTrainingDto } from '@trening-tracker/shared';

export class CreateExerciseInTrainingDto implements ICreateExerciseInTrainingDto {
    name: string;
    trainingId: string;
    templateId: string;
}
