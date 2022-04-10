import { Injectable } from '@nestjs/common';
import { IPaginationQueryDto } from '@trening-tracker/shared';
import { LocalFileDatabase } from '../../shared/LocalFileDatabase';
import { TTrainingEntityProps } from './application/enitites/TrainingEntity';

@Injectable()
export class TrainingReadService {
    private db = new LocalFileDatabase<TTrainingEntityProps>('trainings');

    listAccountTrainings(
        accountId: string,
        pagination: IPaginationQueryDto
    ): Promise<(TTrainingEntityProps & { id: string })[]> {
        return Promise.resolve(
            Object.entries(this.db.data)
                .filter(([id, training]) => training.accountId.toValue() === accountId)
                .sort(([, training1], [, training2]) => training1.startedAt.getTime() - training2.startedAt.getTime())
                .map(([id, training]) => ({ ...training, id }))
                .slice(pagination.skip, pagination.limit)
        );
    }

    count(accountId: string): Promise<number> {
        return Promise.resolve(
            Object.entries(this.db.data).filter(([id, training]) => training.accountId.toValue() === accountId).length
        );
    }
}
