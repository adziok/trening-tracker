import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserSessionFactory } from './UserSessionFactory';
import { AppModule } from '../../src/app.module';
import { JwtVerifier } from '../../src/modules/auth/JwtVerifier';
import { mockedJwtVerifier } from './mocks';

export const createTestingApp = async () => {
    // const mongo = await new GenericContainer('mongo').withExposedPorts(DEFAULT_MONGO_PORT).start();

    const moduleFixture = Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(JwtVerifier)
        .useValue(mockedJwtVerifier);

    const app = (await moduleFixture.compile()).createNestApplication();
    attachPipes(app);

    const userSessionFactory = new UserSessionFactory(app);
    await app.init();

    return { userSessionFactory, app };
};

const attachPipes = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
};
