import { Module } from '@nestjs/common';
import { FailureSoService } from './failure_so.service';
import { FailureSoController } from './failure_so.controller';

@Module({
  controllers: [FailureSoController],
  providers: [FailureSoService],
})
export class FailureSoModule {}
