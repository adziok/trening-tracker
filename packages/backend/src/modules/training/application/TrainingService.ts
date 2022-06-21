import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './repositories/TrainingRepository';
import { isDefined, UniqueEntityId } from '../../../shared/classes';
import { TUniqueEntityId } from '../../../shared/classes/UniqueEntityId';
import { TrainingEntity } from './enitites/TrainingEntity';
import { ICreateTraining, IUpdateTraining } from '../interfaces';

@Injectable()
export class TrainingService {
    constructor(private readonly trainingRepository: TrainingRepository) {}

    async createTraining(props: ICreateTraining): Promise<TUniqueEntityId> {
        let trainingResult: TrainingEntity;
        if (isDefined(props.startedAt)) {
            trainingResult = TrainingEntity.create({
                accountId: UniqueEntityId.recreate(props.accountId),
                startedAt: props.startedAt,
                name: props.name,
                exercises: [],
            });
        } else {
            trainingResult = TrainingEntity.createStartedNow({
                name: props.name,
                accountId: UniqueEntityId.recreate(props.accountId),
                exercises: [],
            });
        }

        await this.trainingRepository.save(trainingResult);
        return trainingResult.id.toValue();
    }

    async isTrainingWithIdIsRelatedToAccount({
        trainingId,
        accountId,
    }: {
        trainingId: string;
        accountId: string;
    }): Promise<boolean> {
        return !!(await this.trainingRepository.getByIdAndAccountId(
            UniqueEntityId.recreate(trainingId),
            UniqueEntityId.recreate(accountId)
        ));
    }

    async updateTraining(updateTrainingData: IUpdateTraining): Promise<TUniqueEntityId> {
        const training = await this.trainingRepository.getByIdAndAccountId(
            UniqueEntityId.recreate(updateTrainingData.id),
            UniqueEntityId.recreate(updateTrainingData.accountId)
        );
        const trainingResult = training.update(updateTrainingData);

        await this.trainingRepository.save(trainingResult);
        return trainingResult.id.toValue();
    }
}
