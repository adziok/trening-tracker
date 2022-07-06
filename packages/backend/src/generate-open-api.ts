import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder().setTitle('Training tracker api').setVersion('1.0.0').build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./open-api.json', JSON.stringify(document));
}

bootstrap()
    .then(() => console.log('Generated'))
    .catch(() => console.log('ERROR'));
