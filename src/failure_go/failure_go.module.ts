import { Module } from '@nestjs/common';
import { FailureGoService } from './failure_go.service';
import { FailureGoController } from './failure_go.controller';

@Module({
  controllers: [FailureGoController],
  providers: [FailureGoService],
})
export class FailureGoModule {}
