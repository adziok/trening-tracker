import { isUUID } from '@nestjs/common/utils/is-uuid';
import { randomUUID } from 'crypto';
import { TrainingService } from '../TrainingService';
import { InMemoryTrainingRepository } from '../../infra/database/InMemoryTrainingRepository';
import { DateUtils } from '../../../../shared/classes/DateUtils';
import { InMemoryExerciseRepository } from '../../infra/database/InMemoryExerciseRepository';
import { ExerciseService } from '../ExerciseService';

describe('CreateTraining', () => {
    let trainingService: TrainingService;
    let exerciseService: ExerciseService;
    let accountId: string;

    beforeEach(() => {
        const trainingRepository = new InMemoryTrainingRepository();
        const exerciseRepository = new InMemoryExerciseRepository();
        trainingService = new TrainingService(trainingRepository);
        exerciseService = new ExerciseService(exerciseRepository, trainingService);
        accountId = randomUUID();
    });

    it('should create training with current date', async () => {
        const mockedDate = new Date('2022-02-01');
        jest.spyOn(DateUtils, 'now').mockImplementation(() => mockedDate);

        const trainingId = await trainingService.createTraining({ accountId, name: 'Important training' });
        expect(isUUID(trainingId)).toBeTruthy();
    });

    it('should create training with given date', async () => {
        const mockedDate = new Date('2022-02-01');

        const trainingId = await trainingService.createTraining({
            accountId,
            name: 'Important training',
            startedAt: mockedDate,
        });
        expect(isUUID(trainingId)).toBeTruthy();
    });

    it('should create exercise', async () => {
        const trainingId = await trainingService.createTraining({ accountId, name: 'Important training' });
        const exerciseId = await exerciseService.createExercise({ trainingId, accountId, name: 'Dead lift' });
        expect(isUUID(exerciseId)).toBeTruthy();
    });

    it('should throw when invalid trainingId is provided', async () => {
        await expect(() =>
            exerciseService.createExercise({ trainingId: '123', accountId, name: 'Dead lift' })
        ).rejects.toThrow();
    });
});
