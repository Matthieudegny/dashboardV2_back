import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SoService } from './so.service';
import { SoController } from './so.controller';
import { So } from '../entities/Setup/Associations/So';

import { SetupGoModule } from '../setup_go/setupGo.module';

@Module({
  imports: [TypeOrmModule.forFeature([So]), SetupGoModule],
  controllers: [SoController],
  providers: [SoService],
  exports: [SoService],
})
export class So_Module {}
