import { Injectable } from '@nestjs/common';
import { IExerciseDto, IPaginationDto, IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { TrainingReadService } from './TrainingReadService';
import { ExerciseReadService } from './ExerciseReadService';

@Injectable()
export class TrainingReadFacade {
    constructor(
        private readonly trainingReadService: TrainingReadService,
        private readonly exerciseReadService: ExerciseReadService
    ) {}

    getAccountTrainingById(accountId: string, id: string): Promise<ITrainingDto> {
        return this.trainingReadService.getAccountTrainingById(accountId, id);
    }

    async listTrainings(accountId: string, pagination: IPaginationQueryDto): Promise<IPaginationDto<ITrainingDto>> {
        const nodes = await this.trainingReadService.listAccountTrainings(accountId, pagination);
        const totalCount = await this.trainingReadService.count(accountId);
        return {
            nodes,
            totalCount,
            nextUrl: '',
            skip: pagination.skip,
        };
    }

    async listTrainingExercises(
        props: { accountId: string; trainingId: string },
        pagination: IPaginationQueryDto
    ): Promise<IPaginationDto<IExerciseDto>> {
        const nodes = await this.exerciseReadService.listTrainingExercises(props, pagination);
        const totalCount = await this.exerciseReadService.count(props);
        return {
            nodes,
            totalCount,
            nextUrl: '',
            skip: pagination.skip,
        };
    }
}
