import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationQueryDto, ITrainingDto } from '@trening-tracker/shared';
import { TrainingRecord } from '../infra/database/TrainingRecord';
import { LocalFileDatabase } from '../../../shared/LocalFileDatabase';

@Injectable()
export class TrainingReadService {
    private db = new LocalFileDatabase<TrainingRecord>('trainings');

    getAccountTrainingById(accountId: string, id: string): Promise<ITrainingDto> {
        this.db.load();
        const training = Object.values(this.db.data).find(
            (training) => training.accountId === accountId && training.id === id
        );
        if (!training) {
            throw new NotFoundException();
        }
        return Promise.resolve(training);
    }

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
