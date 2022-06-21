import { isUUID } from '@nestjs/common/utils/is-uuid';
import { randomUUID } from 'crypto';
import { TrainingService } from '../TrainingService';
import { ExerciseService } from '../ExerciseService';
import { InMemoryTrainingRepository } from '../../infra/database/InMemoryTrainingRepository';
import { InMemoryExerciseRepository } from '../../infra/database/InMemoryExerciseRepository';

const createTrainingWithExercise =
    (trainingService: TrainingService, exerciseService: ExerciseService) => async (accountId: string) => {
        const trainingId = await trainingService.createTraining({ accountId, name: 'Important training' });

        const exerciseId = await exerciseService.addExerciseToTraining({
            trainingId,
            accountId,
            name: 'Push ups',
        });

        return {
            trainingId,
            exerciseId,
        };
    };

describe('ManageExerciseSeries', () => {
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

    it('should add exercise to training', async () => {
        const { exerciseId, trainingId } = await createTrainingWithExercise(
            trainingService,
            exerciseService
        )(accountId);

        const seriesId = await exerciseService.addSeriesToExercise({
            exerciseId,
            accountId,
            trainingId,
            weight: 100,
            reps: 10,
        });

        expect(isUUID(seriesId)).toBeTruthy();
    });
});
