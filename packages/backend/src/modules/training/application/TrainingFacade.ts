import { Injectable } from '@nestjs/common';
import { ExerciseService } from './ExerciseService';
import { TrainingService } from './TrainingService';
import {
    IAddSeriesToExercise,
    ICreateExerciseInTraining,
    ICreateTraining,
    IRemoveExerciseFromTraining,
    IUpdateTraining,
} from './interfaces';

@Injectable()
export class TrainingFacade {
    constructor(private readonly exerciseService: ExerciseService, private readonly trainingService: TrainingService) {}

    createTraining(trainingDto: ICreateTraining): Promise<string> {
        return this.trainingService.createTraining(trainingDto);
    }

    updateTraining(trainingDto: IUpdateTraining): Promise<string> {
        return this.trainingService.updateTraining(trainingDto);
    }

    createExerciseInTraining(exercise: ICreateExerciseInTraining): Promise<string> {
        return this.exerciseService.createExerciseInTraining(exercise);
    }

    removeExerciseFromTraining(exercise: IRemoveExerciseFromTraining): Promise<string> {
        return this.exerciseService.removeExerciseFromTraining(exercise);
    }

    addSeriesToExercise(series: IAddSeriesToExercise): Promise<string> {
        return this.exerciseService.addSeriesToExercise(series);
    }

    // removeSeriesToExercise(exercise: IRemoveExerciseFromTraining): Promise<string> {
    //     return this.exerciseService.removeExerciseFromTraining(exercise);
    // }
}
