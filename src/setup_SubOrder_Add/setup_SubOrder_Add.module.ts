import { Module } from '@nestjs/common';
import { Setup_SubOrder_Add_Service } from './setup_SubOrder_Add.service';
import { Setup_SubOrder_Add_Controller } from './setup_SubOrder_Add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_SubOrder_Add } from 'src/entities/Setup/Setup_SubOrder_Add';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_SubOrder_Add])],
  controllers: [Setup_SubOrder_Add_Controller],
  providers: [Setup_SubOrder_Add_Service],
  exports: [Setup_SubOrder_Add_Service],
})
export class Setup_SubOrder_Add_Module {}
