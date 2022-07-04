import { Module } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { TrainingFacade } from './application/TrainingFacade';
import { TrainingReadService } from './read/TrainingReadService';
import { ExerciseReadService } from './read/ExerciseReadService';
import { TrainingReadFacade } from './read/TrainingReadFacade';
import { TrainingInfraModule } from './infra/TrainingInfraModule';

@Module({
    imports: [TrainingInfraModule],
    providers: [
        ExerciseService,
        TrainingService,
        TrainingFacade,
        TrainingReadService,
        ExerciseReadService,
        TrainingReadFacade,
    ],
    exports: [TrainingFacade, TrainingReadFacade],
})
export class TrainingModule {}
