import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { TrainingFacade } from '../../modules/training/TrainingFacade';
import { CreateExerciseInTrainingDto, RemoveExerciseFromTrainingDto } from './dtos';
import { CurrentAccount } from '../../modules/auth/CurrentAccount';
import { TAccount } from '../../modules/accounts/application/AccountFacade';
import { IExerciseDto, IPaginationDto, IPaginationExercisesQueryDto } from '@trening-tracker/shared';
import { Authorized } from '../../modules/auth';
import { MutableActionResultDto } from '../common/MutableActionResultDto';

@Authorized()
@Controller('exercise')
export class ExerciseController {
    constructor(private readonly trainingFacade: TrainingFacade) {}

    @Post()
    async createExerciseInTraining(
        @CurrentAccount() account: TAccount,
        @Body() dto: CreateExerciseInTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.createExerciseInTraining({ ...dto, accountId: account.id }) };
    }

    @Delete()
    async removeExerciseFromTraining(
        @CurrentAccount() account: TAccount,
        @Body() dto: RemoveExerciseFromTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.removeExerciseFromTraining({ ...dto, accountId: account.id }) };
    }

    @Get()
    list(
        @CurrentAccount() account: TAccount,
        @Query() data: IPaginationExercisesQueryDto
    ): Promise<IPaginationDto<IExerciseDto>> {
        return this.trainingFacade.listTrainingExercises(
            { accountId: account.id, trainingId: data.trainingId },
            { skip: data.skip || 0, limit: data.limit || 10 }
        );
    }
}
