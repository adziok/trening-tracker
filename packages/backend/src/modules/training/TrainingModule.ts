import { Module } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ExerciseRepository } from './application/repositories/ExerciseRepository';
import { InMemoryExerciseRepository } from './infra/database/InMemoryExerciseRepository';
import { TrainingRepository } from './application/repositories/TrainingRepository';
import { InMemoryTrainingRepository } from './infra/database/InMemoryTrainingRepository';
import { TrainingFacade } from './TrainingFacade';

@Module({
    providers: [
        ExerciseService,
        TrainingService,
        {
            provide: ExerciseRepository,
            useClass: InMemoryExerciseRepository,
        },
        {
            provide: TrainingRepository,
            useClass: InMemoryTrainingRepository,
        },
        TrainingFacade,
    ],
    exports: [TrainingFacade],
})
export class TrainingModule {}
