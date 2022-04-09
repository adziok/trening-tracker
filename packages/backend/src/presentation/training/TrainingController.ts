import { Body, Controller, Post } from '@nestjs/common';
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
}
