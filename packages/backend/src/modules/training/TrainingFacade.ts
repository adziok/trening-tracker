import { Injectable } from '@nestjs/common';
import { ExerciseService } from './application/ExerciseService';
import { TrainingService } from './application/TrainingService';
import { ICreateTraining } from '../interfaces';

@Injectable()
export class TrainingFacade {
    constructor(private readonly exerciseService: ExerciseService, private readonly trainingService: TrainingService) {}

    createTraining(trainingDto: ICreateTraining): Promise<string> {
        return this.trainingService.createTraining(trainingDto);
    }
}
