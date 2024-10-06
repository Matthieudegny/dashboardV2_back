import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S_o_Service } from './s_o.service';
import { S_o_Controller } from './s_o.controller';
import { S_o } from '../entities/Setup/Associations/S_o';

import { SetupOrderModule } from '../setupOrder/setupOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([S_o]), SetupOrderModule],
  controllers: [S_o_Controller],
  providers: [S_o_Service],
  exports: [S_o_Service],
})
export class S_o_Module {}
