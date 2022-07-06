import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TrainingFacade } from '../../modules/training/application/TrainingFacade';
import { CurrentAccount } from '../../modules/auth/CurrentAccount';
import { TAccount } from '../../modules/accounts/application/AccountFacade';
import { Authorized } from '../../modules/auth';
import { MutableActionResultDto } from '../common/MutableActionResultDto';
import { TrainingReadFacade } from '../../modules/training/read/TrainingReadFacade';
import { CreateExerciseInTrainingDto } from './dtos/CreateExerciseInTrainingDto';
import { AddSeriesInExerciseDto } from './dtos/AddSeriesInExerciseDto';
import { PaginationExercisesQueryDto } from './dtos/PaginationExercisesQueryDto';
import { ExerciseListDto } from './dtos/ExercoseListDto';

@Authorized()
@Controller('exercise')
export class ExerciseController {
    constructor(
        private readonly trainingFacade: TrainingFacade,
        private readonly trainingReadFacade: TrainingReadFacade
    ) {}

    @Post()
    async createExerciseInTraining(
        @CurrentAccount() account: TAccount,
        @Body() dto: CreateExerciseInTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.createExerciseInTraining({ ...dto, accountId: account.id }) };
    }

    @Post(':trainingId/:exerciseId')
    async createSeriesInExercise(
        @CurrentAccount() account: TAccount,
        @Body() dto: AddSeriesInExerciseDto,
        @Param('trainingId') trainingId: string,
        @Param('exerciseId') exerciseId: string
    ): Promise<MutableActionResultDto> {
        return {
            id: await this.trainingFacade.addSeriesToExercise({
                ...dto,
                accountId: account.id,
                exerciseId,
                trainingId,
            }),
        };
    }

    @Delete(':trainingId/:exerciseId')
    async removeExerciseFromTraining(
        @CurrentAccount() account: TAccount,
        @Param('trainingId') trainingId: string,
        @Param('exerciseId') exerciseId: string
    ): Promise<MutableActionResultDto> {
        return {
            id: await this.trainingFacade.removeExerciseFromTraining({ trainingId, exerciseId, accountId: account.id }),
        };
    }

    @Get()
    list(@CurrentAccount() account: TAccount, @Query() data: PaginationExercisesQueryDto): Promise<ExerciseListDto> {
        return this.trainingReadFacade.listTrainingExercises(
            { accountId: account.id, trainingId: data.trainingId },
            { skip: data.skip || 0, limit: data.limit || 10 }
        );
    }
}
