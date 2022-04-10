import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IPaginationDto, IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { TrainingFacade } from '../../modules/training/TrainingFacade';
import { Authorized } from '../../modules/auth';
import { MutableActionResultDto } from '../common/MutableActionResultDto';
import { CreateTrainingDto } from './dtos/CreateTrainingDto';
import { CurrentAccount } from '../../modules/auth/CurrentAccount';
import { TAccount } from '../../modules/accounts/application/AccountFacade';

@Authorized()
@Controller('training')
export class TrainingController {
    constructor(private readonly trainingFacade: TrainingFacade) {}

    @Post()
    async createTraining(
        @CurrentAccount() account: TAccount,
        @Body() data: CreateTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.createTraining({ ...data, accountId: account.id }) };
    }

    @Get()
    list(
        @CurrentAccount() account: TAccount,
        @Query() data: IPaginationQueryDto
    ): Promise<IPaginationDto<ITrainingDto>> {
        return this.trainingFacade.listTrainings(account.id, { skip: data.skip || 0, limit: data.limit || 10 });
    }
}
