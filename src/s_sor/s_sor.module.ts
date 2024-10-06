import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S_sor_Service } from './s_sor.service';
import { S_sor_Controller } from './s_sor.rcontroller';
import { S_sor } from '../entities/Setup/Associations/S_sor';

import { SetupSubOrderModule } from '../setupSubOrder/setupSubOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([S_sor]), SetupSubOrderModule],
  controllers: [S_sor_Controller],
  providers: [S_sor_Service],
  exports: [S_sor_Service],
})
export class S_sor_Module {}
