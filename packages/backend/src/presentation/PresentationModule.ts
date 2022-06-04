import { Module } from '@nestjs/common';
import { AccountsController } from './AccountsController';
import { TrainingController } from './training/TrainingController';
import { TrainingModule } from '../modules/training/TrainingModule';
import { ExerciseController } from './exercise/ExerciseController';

@Module({
    imports: [TrainingModule],
    controllers: [AccountsController, TrainingController, ExerciseController],
})
export class PresentationModule {}
