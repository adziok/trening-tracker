import { isUUID } from '@nestjs/common/utils/is-uuid';
import { randomUUID } from 'crypto';
import { TrainingService } from '../TrainingService';
import { DateUtils } from '../../../../shared/classes/DateUtils';
import { ExerciseService } from '../ExerciseService';
import { InMemoryTrainingRepository } from '../../infra/database/InMemoryTrainingRepository';
import { InMemoryExerciseRepository } from '../../infra/database/InMemoryExerciseRepository';
import { UniqueEntityId } from '../../../../shared/classes';

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

    it('should add exercise to training', async () => {
        const trainingId = await trainingService.createTraining({ accountId, name: 'Important training' });

        const exerciseId = await exerciseService.addExerciseToTraining({
            trainingId,
            accountId,
            name: 'Push ups',
        });
        expect(isUUID(exerciseId)).toBeTruthy();
    });

    it('should throw when we trying add exercise to training but trainingId is invalid', async () => {
        const invalidTrainingId = UniqueEntityId.generate();

        await expect(() =>
            exerciseService.addExerciseToTraining({
                trainingId: invalidTrainingId.toString(),
                accountId,
                name: 'Push ups',
            })
        ).rejects.toThrow();
    });

    it('should throw when we trying add exercise to training but trainingId is not correlated to account', async () => {
        const differentAccountId = randomUUID();
        const trainingId = await trainingService.createTraining({
            accountId: differentAccountId,
            name: 'Important training',
        });

        await expect(() =>
            exerciseService.addExerciseToTraining({
                trainingId,
                accountId,
                name: 'Push ups',
            })
        ).rejects.toThrow();
    });
});
