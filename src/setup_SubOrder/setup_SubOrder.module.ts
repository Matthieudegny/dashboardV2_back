import { Module } from '@nestjs/common';
import { Setup_SubOrder_Service } from './setup_SubOrder.service';
import { Setup_SubOrder_Controller } from './setup_SubOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_SubOrder } from '../entities/Setup/Setup_SubOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_SubOrder])],
  controllers: [Setup_SubOrder_Controller],
  providers: [Setup_SubOrder_Service],
  exports: [Setup_SubOrder_Service],
})
export class Setup_SubOrder_Module {}
