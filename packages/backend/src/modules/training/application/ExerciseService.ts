import { Injectable } from '@nestjs/common';
import { TUniqueEntityId, UniqueEntityId } from '../../../shared/classes/UniqueEntityId';
import { ExerciseRepository } from './repositories/ExerciseRepository';
import { ExerciseEntity } from './enitites/ExerciseEntity';
import { TrainingService } from './TrainingService';
import {
    IAddExerciseToTraining,
    IAddSeriesToExercise,
    ICreateExerciseInTraining,
    IRemoveExerciseFromTraining,
} from './interfaces';
import { TrainingNotRelatedToAccountException } from './errors';
import { ExerciseSeriesEntity } from './enitites/ExerciseSeriesEntity';

@Injectable()
export class ExerciseService {
    constructor(
        private readonly exerciseRepository: ExerciseRepository,
        private readonly trainingService: TrainingService
    ) {}

    async createExerciseInTraining(props: ICreateExerciseInTraining): Promise<TUniqueEntityId> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        const exerciseResult = ExerciseEntity.create({
            name: props.name,
            trainingId: UniqueEntityId.recreate(props.trainingId),
        });

        await this.exerciseRepository.save(exerciseResult);
        return exerciseResult.id.toValue();
    }

    async removeExerciseFromTraining(props: IRemoveExerciseFromTraining): Promise<TUniqueEntityId> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        await this.exerciseRepository.removeById(UniqueEntityId.recreate(props.exerciseId));
        return props.exerciseId;
    }

    async addExerciseToTraining(props: IAddExerciseToTraining) {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        const exerciseResult = ExerciseEntity.create({
            name: props.name,
            trainingId: UniqueEntityId.recreate(props.trainingId),
        });
        // Maybe add constraint to have unique exercise name per training?

        await this.exerciseRepository.save(exerciseResult);
        return exerciseResult.id.toValue();
    }

    async addSeriesToExercise(props: IAddSeriesToExercise): Promise<TUniqueEntityId> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        const exercise = await this.exerciseRepository.getById(UniqueEntityId.recreate(props.exerciseId));
        const series = ExerciseSeriesEntity.create({
            reps: props.reps,
            weight: props.weight,
        });

        exercise.addSeries(series);
        await this.exerciseRepository.save(exercise);

        return series.id.toValue();
    }
}
