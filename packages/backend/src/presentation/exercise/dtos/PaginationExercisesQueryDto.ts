import { IPaginationExercisesQueryDto } from '@trening-tracker/shared';

export class PaginationExercisesQueryDto implements IPaginationExercisesQueryDto {
    limit: number;
    skip: number;
    trainingId: string;
}
