import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S_Soa_Service } from './s_soa.service';
import { S_Soa_Controller } from './s_soa.controller';
import { S_soa } from '../entities/Setup/Associations/S_soa';

import { SetupOrderModule } from '../setupOrder/setupOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([S_soa]), SetupOrderModule],
  controllers: [S_Soa_Controller],
  providers: [S_Soa_Service],
  exports: [S_Soa_Service],
})
export class S_Soa_Module {}
