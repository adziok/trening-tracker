import { Injectable } from '@nestjs/common';
import { IExerciseDto, IPaginationDto, IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ICreateExerciseInTraining, ICreateTraining, IRemoveExerciseFromTraining, IUpdateTraining } from './interfaces';
import { TrainingReadService } from './TrainingReadService';
import { ExerciseReadService } from './ExerciseReadService';

@Injectable()
export class TrainingFacade {
    constructor(
        private readonly exerciseService: ExerciseService,
        private readonly trainingService: TrainingService,
        private readonly trainingReadService: TrainingReadService,
        private readonly exerciseReadService: ExerciseReadService
    ) {}

    createTraining(trainingDto: ICreateTraining): Promise<string> {
        return this.trainingService.createTraining(trainingDto);
    }

    updateTraining(trainingDto: IUpdateTraining): Promise<string> {
        return this.trainingService.updateTraining(trainingDto);
    }

    createExerciseInTraining(exercise: ICreateExerciseInTraining): Promise<string> {
        return this.exerciseService.createExerciseInTraining(exercise);
    }

    removeExerciseFromTraining(exercise: IRemoveExerciseFromTraining): Promise<string> {
        return this.exerciseService.removeExerciseFromTraining(exercise);
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
