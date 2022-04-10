import { Injectable } from '@nestjs/common';
import { IPaginationQueryDto } from '@trening-tracker/shared';
import { LocalFileDatabase } from '../../shared/LocalFileDatabase';
import { TrainingRecord } from './infra/database/TrainingRecord';

@Injectable()
export class TrainingReadService {
    private db = new LocalFileDatabase<TrainingRecord>('trainings');

    listAccountTrainings(accountId: string, pagination: IPaginationQueryDto): Promise<TrainingRecord[]> {
        this.db.load();
        return Promise.resolve(
            Object.values(this.db.data)
                .filter((training) => training.accountId === accountId)
                .map((training) => ({ ...training, startedAt: new Date(training.startedAt) }))
                .sort((training1, training2) => training1.startedAt.getTime() - training2.startedAt.getTime())
                .slice(pagination.skip, pagination.limit)
        );
    }

    count(accountId: string): Promise<number> {
        return Promise.resolve(
            Object.values(this.db.data).filter((training) => training.accountId === accountId).length
        );
    }
}
