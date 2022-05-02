import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { TrainingFacade } from '../../modules/training/TrainingFacade';
import { CreateExerciseInTrainingDto, RemoveExerciseFromTrainingDto } from './dtos';
import { CurrentAccount } from '../../modules/auth/CurrentAccount';
import { TAccount } from '../../modules/accounts/application/AccountFacade';
import { IExerciseDto, IPaginationDto, IPaginationExercisesQueryDto } from '@trening-tracker/shared';

@Controller('exercise')
export class ExerciseController {
    constructor(private readonly trainingFacade: TrainingFacade) {}

    @Post()
    createExerciseInTraining(@CurrentAccount() account: TAccount, @Body() dto: CreateExerciseInTrainingDto) {
        return this.trainingFacade.createExerciseInTraining({ ...dto, accountId: account.id });
    }

    @Delete()
    removeExerciseFromTraining(@CurrentAccount() account: TAccount, @Body() dto: RemoveExerciseFromTrainingDto) {
        return this.trainingFacade.removeExerciseFromTraining({ ...dto, accountId: account.id });
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
