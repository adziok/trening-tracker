import { Module } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ExerciseRepository } from './application/repositories/ExerciseRepository';
import { InMemoryExerciseRepository } from './infra/database/InMemoryExerciseRepository';
import { TrainingRepository } from './application/repositories/TrainingRepository';
import { InMemoryTrainingRepository } from './infra/database/InMemoryTrainingRepository';

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
    ],
})
export class TrainingModule {}
