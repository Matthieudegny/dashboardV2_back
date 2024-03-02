import { Module } from '@nestjs/common';
import { FailureGoService } from './failure_go.service';
import { FailureGoController } from './failure_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_Go } from '../entities/Failure/Failure_go';
import { Failure } from '../entities/Failure/Failure';
import { FailureService } from '../failure/failure.service';
import { FailureModule } from '../failure/failure.module';

@Module({
  imports: [TypeOrmModule.forFeature([Failure_Go, Failure]), FailureModule],
  controllers: [FailureGoController],
  providers: [FailureGoService, FailureService],
  exports: [FailureGoService],
})
export class FailureGoModule {}
