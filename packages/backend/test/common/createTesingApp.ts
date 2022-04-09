import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserSessionFactory } from './UserSessionFactory';
import { AppModule } from '../../src/app.module';

export const createTestingApp = async () => {
    // const mongo = await new GenericContainer('mongo').withExposedPorts(DEFAULT_MONGO_PORT).start();

    const moduleFixture = Test.createTestingModule({
        imports: [AppModule],
    });

    const app = (await moduleFixture.compile()).createNestApplication();
    attachPipes(app);

    const userSessionFactory = new UserSessionFactory(app);
    await app.init();

    return { userSessionFactory, app };
};

const attachPipes = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
};
