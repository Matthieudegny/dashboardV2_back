import { Module } from '@nestjs/common';
import { FailureSoService } from './failure_so.service';
import { FailureSoController } from './failure_so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_So } from '../entities/Failure/Failure_so';

@Module({
  imports: [TypeOrmModule.forFeature([Failure_So])],
  controllers: [FailureSoController],
  providers: [FailureSoService],
})
export class FailureSoModule {}
