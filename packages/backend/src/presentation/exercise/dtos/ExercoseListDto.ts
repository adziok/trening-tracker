import { IExerciseDto, IPaginationDto } from '@trening-tracker/shared';

export class ExerciseListDto implements IPaginationDto<IExerciseDto> {
    nextUrl: string;
    nodes: IExerciseDto[];
    skip: number;
    totalCount: number;
}
