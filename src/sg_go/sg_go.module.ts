import { Module } from '@nestjs/common';
import { SgGoService } from './sg_go.service';
import { SetupGoController } from './sg_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sg_Go } from '../entities/Setup/Associations/Ss_go';

import { SetupGoModule } from '../setup_go/setupGo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sg_Go]), SetupGoModule],
  controllers: [SetupGoController],
  providers: [SgGoService],
  exports: [SgGoService],
})
export class Sg_Go_Module {}
