import { Module } from '@nestjs/common';
import { Image_Suborder_Reduce_Service } from './image_Sub_Order_Reduce.service';
import { Image_Suborder_Reduce_Controller } from './image_Sub_Order_Reduce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Suborder_Reduce } from '../entities/image/Image_Suborder_Reduce';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Suborder_Reduce])],
  controllers: [Image_Suborder_Reduce_Controller],
  providers: [Image_Suborder_Reduce_Service],
  exports: [Image_Suborder_Reduce_Service],
})
export class Image_Suborder_Reduce_Module {}
