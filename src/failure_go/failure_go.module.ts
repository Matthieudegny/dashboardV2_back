import { Module } from '@nestjs/common';
import { FailureGoService } from './failure_go.service';
import { FailureGoController } from './failure_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_Go } from '../entities/Failure/Failure_go';

@Module({
  imports: [TypeOrmModule.forFeature([Failure_Go])],
  controllers: [FailureGoController],
  providers: [FailureGoService],
})
export class FailureGoModule {}
