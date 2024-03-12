import { Module } from '@nestjs/common';
import { FailureSoController } from './failure_so.controller';
import { FailureSoService } from './failure_so.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_so } from '../entities/Failure/Failure_so';

@Module({
  imports: [TypeOrmModule.forFeature([Failure_so])],
  controllers: [FailureSoController],
  providers: [FailureSoService],
  exports: [FailureSoService],
})
export class FailureSoModule {}
