import { Module } from '@nestjs/common';
import { ExerciseRepository } from '../application/repositories/ExerciseRepository';
import { LocalMemoryExerciseRepository } from './database/LocalMemoryExerciseRepository';
import { TrainingRepository } from '../application/repositories/TrainingRepository';
import { LocalMemoryTrainingRepository } from './database/LocalMemoryTrainingRepository';

@Module({
    providers: [
        {
            provide: ExerciseRepository,
            useClass: LocalMemoryExerciseRepository,
        },
        {
            provide: TrainingRepository,
            useClass: LocalMemoryTrainingRepository,
        },
    ],
    exports: [ExerciseRepository, TrainingRepository],
})
export class TrainingInfraModule {}
