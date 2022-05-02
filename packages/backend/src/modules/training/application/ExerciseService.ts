import { Injectable } from '@nestjs/common';
import { TUniqueEntityId, UniqueEntityId } from '../../../shared/classes/UniqueEntityId';
import { ExerciseRepository } from './repositories/ExerciseRepository';
import { ExerciseEntity } from './enitites/ExerciseEntity';
import { TrainingService } from './TrainingService';
import { BaseError } from '../../../shared/classes/Result';

@Injectable()
export class ExerciseService {
    constructor(
        private readonly exerciseRepository: ExerciseRepository,
        private readonly trainingService: TrainingService
    ) {}

    async createExerciseInTraining(props: {
        accountId: string;
        name: string;
        trainingId: string;
    }): Promise<TUniqueEntityId> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new BaseError('Training with given id not exists or is not related  to your account');
        }
        const exerciseResult = ExerciseEntity.create({
            name: props.name,
            trainingId: UniqueEntityId.recreate(props.trainingId),
        });

        if (exerciseResult.hasError()) throw exerciseResult.error;

        await this.exerciseRepository.save(exerciseResult.value);
        return exerciseResult.value.id.toValue();
    }

    async removeExerciseFromTraining(props: {
        accountId: string;
        exerciseId: string;
        trainingId: string;
    }): Promise<TUniqueEntityId> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new BaseError('Training with given id not exists or is not related  to your account');
        }
        await this.exerciseRepository.removeById(UniqueEntityId.recreate(props.exerciseId));
        return props.exerciseId;
    }
}
