import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SoService } from './so.service';
import { SoController } from './so.controller';
import { So } from '../entities/Setup/Associations/So';

import { SetupOrderModule } from '../setupOrder/setupOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([So]), SetupOrderModule],
  controllers: [SoController],
  providers: [SoService],
  exports: [SoService],
})
export class So_Module {}
