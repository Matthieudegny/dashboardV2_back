import { Module } from '@nestjs/common';
import { Image_Suborder_Add_Service } from './image_Sub_Order_Add.service';
import { Image_Suborder_Add_Controller } from './image_Sub_Order_Add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Suborder_Add } from '../entities/image/Image_Suborder_Add';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Suborder_Add])],
  controllers: [Image_Suborder_Add_Controller],
  providers: [Image_Suborder_Add_Service],
  exports: [Image_Suborder_Add_Service],
})
export class Image_Suborder_Add_Module {}
