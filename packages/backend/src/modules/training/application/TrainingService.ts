import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './repositories/TrainingRepository';
import { isDefined, Result, UniqueEntityId } from '../../../shared/classes';
import { TUniqueEntityId } from '../../../shared/classes/UniqueEntityId';
import { TrainingEntity } from './enitites/TrainingEntity';
import { ICreateTraining } from '../../interfaces';

@Injectable()
export class TrainingService {
    constructor(private readonly trainingRepository: TrainingRepository) {}

    async createTraining(props: ICreateTraining): Promise<TUniqueEntityId> {
        let trainingResult: Result<TrainingEntity>;
        if (isDefined(props.startedAt)) {
            trainingResult = TrainingEntity.create({
                accountId: UniqueEntityId.recreate(props.accountId),
                startedAt: props.startedAt,
                name: props.name,
            });
        } else {
            trainingResult = TrainingEntity.createStartedNow({
                name: props.name,
                accountId: UniqueEntityId.recreate(props.accountId),
            });
        }
        if (trainingResult.hasError()) throw trainingResult.error;

        await this.trainingRepository.save(trainingResult.value);
        return trainingResult.value.id.toValue();
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
}
