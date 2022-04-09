import { Module } from '@nestjs/common';
import { AccountsController } from './AccountsController';
import { TrainingController } from './training/TrainingController';
import { TrainingModule } from '../modules/training/TrainingModule';

@Module({
    imports: [TrainingModule],
    controllers: [AccountsController, TrainingController],
})
export class PresentationModule {}
