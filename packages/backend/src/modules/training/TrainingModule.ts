import { Module } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ExerciseRepository } from './application/repositories/ExerciseRepository';
import { TrainingRepository } from './application/repositories/TrainingRepository';
import { TrainingFacade } from './TrainingFacade';
import { TrainingReadService } from './TrainingReadService';
import { LocalMemoryTrainingRepository } from './infra/database/LocalMemoryTrainingRepository';
import { LocalMemoryExerciseRepository } from './infra/database/LocalMemoryExerciseRepository';

@Module({
    providers: [
        ExerciseService,
        TrainingService,
        {
            provide: ExerciseRepository,
            useClass: LocalMemoryExerciseRepository,
        },
        {
            provide: TrainingRepository,
            useClass: LocalMemoryTrainingRepository,
        },
        TrainingFacade,
        TrainingReadService,
    ],
    exports: [TrainingFacade],
})
export class TrainingModule {}
