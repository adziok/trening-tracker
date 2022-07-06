import { IPaginationDto, ITrainingDto } from '@trening-tracker/shared';

export class TrainingListDto implements IPaginationDto<ITrainingDto> {
    nextUrl: string;
    nodes: ITrainingDto[];
    skip: number;
    totalCount: number;
}
