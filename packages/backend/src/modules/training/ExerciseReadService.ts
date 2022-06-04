import { Injectable } from '@nestjs/common';
import { IExerciseDto, IPaginationQueryDto } from '@trening-tracker/shared';
import { ExerciseRecord } from './infra/database/TrainingRecord';
import { LocalFileDatabase } from '../../shared/LocalFileDatabase';
import { TrainingService } from './application/TrainingService';
import { TrainingNotRelatedToAccountException } from './application/errors';

@Injectable()
export class ExerciseReadService {
    constructor(private readonly trainingService: TrainingService) {}
    private db = new LocalFileDatabase<ExerciseRecord>('exercises');

    async listTrainingExercises(
        props: { accountId: string; trainingId: string },
        pagination: IPaginationQueryDto
    ): Promise<IExerciseDto[]> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        this.db.load();
        return Promise.resolve(
            Object.values(this.db.data)
                .filter((exercise) => exercise.trainingId === props.trainingId)
                .slice(pagination.skip, pagination.limit)
        );
    }

    async count(props: { accountId: string; trainingId: string }): Promise<number> {
        if (!(await this.trainingService.isTrainingWithIdIsRelatedToAccount(props))) {
            throw new TrainingNotRelatedToAccountException();
        }
        this.db.load();
        return Promise.resolve(
            Object.values(this.db.data).filter((exercise) => exercise.trainingId === props.trainingId).length
        );
    }
}
