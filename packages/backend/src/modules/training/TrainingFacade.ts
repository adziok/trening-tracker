import { Injectable } from '@nestjs/common';
import { IPaginationDto, IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ICreateTraining, IUpdateTraining } from './interfaces';
import { TrainingReadService } from './TrainingReadService';

@Injectable()
export class TrainingFacade {
    constructor(
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingReadService: TrainingReadService
    ) {}

    createTraining(trainingDto: ICreateTraining): Promise<string> {
        return this.trainingService.createTraining(trainingDto);
    }

    updateTraining(trainingDto: IUpdateTraining): Promise<string> {
        return this.trainingService.updateTraining(trainingDto);
    }

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
}
