import { Injectable } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';

@Injectable()
export class TrainingFacade {
    constructor(private readonly exerciseService: ExerciseService, private readonly trainingService: TrainingService) {}
}
