import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SsSoService } from './ss_so.service';
import { SsSoController } from './ss_so.controller';
import { Ss_So } from '../entities/Setup/Associations/Ss_so';

import { SetupSoModule } from '../setup_so/setupSo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ss_So]), SetupSoModule],
  controllers: [SsSoController],
  providers: [SsSoService],
  exports: [SsSoService],
})
export class Ss_So_Module {}
