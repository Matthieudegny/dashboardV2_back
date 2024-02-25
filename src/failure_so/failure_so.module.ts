import { Module } from '@nestjs/common';
import { FailureSoService } from './failure_so.service';
import { FailureSoController } from './failure_so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_So } from '../entities/Failure/Failure_so';
import { Failure } from '../entities/Failure/Failure';
import { FailureService } from '../failure/failure.service';

@Module({
  imports: [TypeOrmModule.forFeature([Failure_So, Failure])],
  controllers: [FailureSoController],
  providers: [FailureSoService, FailureService],
})
export class FailureSoModule {}
