import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S_so_Service } from './s_so.service';
import { S_so_Controller } from './s_so.controller';
import { S_so } from '../entities/Setup/Associations/S_so';

import { Setup_SubOrder_Module } from '../setup_SubOrder/setup_SubOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([S_so]), Setup_SubOrder_Module],
  controllers: [S_so_Controller],
  providers: [S_so_Service],
  exports: [S_so_Service],
})
export class S_so_Module {}
