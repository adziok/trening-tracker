import { INestApplication } from '@nestjs/common';

export class UserSessionFactory {
    constructor(private app: INestApplication) {}

    create() {}
}
