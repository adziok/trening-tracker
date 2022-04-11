import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserSessionFactory } from './UserSessionFactory';
import { AppModule } from '../../src/app.module';
import { JwtVerifier } from '../../src/modules/auth/JwtVerifier';
import { mockedJwtVerifier } from './mocks';
import { TrainingRepository } from '../../src/modules/training/application/repositories/TrainingRepository';
import { ExerciseRepository } from '../../src/modules/training/application/repositories/ExerciseRepository';
import { InMemoryTrainingRepository } from '../../src/modules/training/infra/database/InMemoryTrainingRepository';
import { InMemoryExerciseRepository } from '../../src/modules/training/infra/database/InMemoryExerciseRepository';

export const createTestingApp = async () => {
    // const mongo = await new GenericContainer('mongo').withExposedPorts(DEFAULT_MONGO_PORT).start();

    const moduleFixture = Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(JwtVerifier)
        .useValue(mockedJwtVerifier)
        .overrideProvider(TrainingRepository)
        .useValue(new InMemoryTrainingRepository({}))
        .overrideProvider(ExerciseRepository)
        .useValue(new InMemoryExerciseRepository({}));

    const app = (await moduleFixture.compile()).createNestApplication();
    attachPipes(app);

    const userSessionFactory = new UserSessionFactory(app);
    await app.init();

    return { userSessionFactory, app };
};

const attachPipes = (app: INestApplication) => {
    // app.useGlobalPipes(new ValidationPipe());
};
