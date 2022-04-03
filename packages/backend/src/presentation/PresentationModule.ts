import { Module } from '@nestjs/common';
import { AccountsController } from './AccountsController';

@Module({
    controllers: [AccountsController],
})
export class PresentationModule {}
