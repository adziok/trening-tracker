import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { TrainingFacade } from '../../modules/training/application/TrainingFacade';
import { Authorized } from '../../modules/auth';
import { MutableActionResultDto } from '../common/MutableActionResultDto';
import { CreateTrainingDto } from './dtos/CreateTrainingDto';
import { CurrentAccount } from '../../modules/auth/CurrentAccount';
import { TAccount } from '../../modules/accounts/application/AccountFacade';
import { UpdateTrainingDto } from './dtos/UpdateTrainingDto';
import { TrainingReadFacade } from '../../modules/training/read/TrainingReadFacade';
import { TrainingListDto } from './dtos/TrainingListDto';

@Authorized()
@Controller('training')
export class TrainingController {
    constructor(
        private readonly trainingFacade: TrainingFacade,
        private readonly trainingReadFacade: TrainingReadFacade
    ) {}

    @Post()
    async createTraining(
        @CurrentAccount() account: TAccount,
        @Body() data: CreateTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.createTraining({ ...data, accountId: account.id }) };
    }

    @Put()
    async updateTraining(
        @CurrentAccount() account: TAccount,
        @Body() data: UpdateTrainingDto
    ): Promise<MutableActionResultDto> {
        return { id: await this.trainingFacade.updateTraining({ ...data, accountId: account.id }) };
    }

    @Get()
    list(@CurrentAccount() account: TAccount, @Query() data: IPaginationQueryDto): Promise<TrainingListDto> {
        return this.trainingReadFacade.listTrainings(account.id, { skip: data.skip || 0, limit: data.limit || 10 });
    }

    @Get(':id')
    get(@CurrentAccount() account: TAccount, @Param('id') id: string): Promise<ITrainingDto> {
        return this.trainingReadFacade.getAccountTrainingById(account.id, id);
    }
}
