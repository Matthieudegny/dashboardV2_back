import { Module } from '@nestjs/common';
import { Setup_SubOrder_Reduce_Service } from './setup_SubOrder_Reduce.service';
import { Setup_SubOrder_Reduce_Controller } from './setup_SubOrder_Reduce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_SubOrder_Reduce } from '../entities/Setup/Setup_SubOrder_Reduce';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_SubOrder_Reduce])],
  controllers: [Setup_SubOrder_Reduce_Controller],
  providers: [Setup_SubOrder_Reduce_Service],
  exports: [Setup_SubOrder_Reduce_Service],
})
export class Setup_SubOrder_Reduce_Module {}
