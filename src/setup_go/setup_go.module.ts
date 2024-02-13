import { Module } from '@nestjs/common';
import { SetupGoService } from './setup_go.service';
import { SetupGoController } from './setup_go.controller';

@Module({
  controllers: [SetupGoController],
  providers: [SetupGoService],
})
export class SetupGoModule {}
