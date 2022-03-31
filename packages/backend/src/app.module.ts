import { Module } from '@nestjs/common';
import { TrainingModule } from './modules/training/TrainingModule';

@Module({
    imports: [TrainingModule],
})
export class AppModule {}
