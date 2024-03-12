import { Module } from '@nestjs/common';
import { Fg_GoService } from './fg_Go.service';
import { Fg_GoController } from './fg_Go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fg_Go } from '../entities/Failure/Associations/Fg_go';
import { FailureGoModule } from '../failure_go/failure_go.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fg_Go, FailureGoModule]),
    FailureGoModule,
  ],
  controllers: [Fg_GoController],
  providers: [Fg_GoService],
  exports: [Fg_GoService],
})
export class Fg_Go_Module {}
