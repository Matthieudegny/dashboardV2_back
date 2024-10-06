import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

// controller test
import { AppController } from './app.controller';

//guards
import { AuthGuard } from './auth/auth.guard';

//entities
import { Failure_go } from './entities/Failure/Failure_go';
import { Fg_Go } from './entities/Failure/Associations/Fg_go';
import { Failure_so } from './entities/Failure/Failure_so';
import { Fs_So } from './entities/Failure/Associations/Fs_So';
import { User } from './entities/User';
import { Image_Order } from './entities/image/ImageOrder';
import { Image_Suborder_Reduce } from './entities/image/Image_Suborder_Reduce';
import { Image_Suborder_Add } from './entities/image/Image_Suborder_Add';
import { Order } from './entities/Order';
import { S_o } from './entities/Setup/Associations/S_o';
import { S_sor } from './entities/Setup/Associations/S_sor';
import { SetupOrder } from './entities/Setup/SetupOrder';
import { SetupSubOrder } from './entities/Setup/SetupSubOrder';
import { Sub_Order_Reduce } from './entities/Sub_Order_Reduce';
import { Sub_Order_Add } from './entities/Sub_Order_Add';

//modules
import { UserModule } from './user/user.module';
//failures
import { FailureGoModule } from './failure_go/failure_go.module';
import { FailureSoModule } from './failure_so/failure_so.module';
import { Fs_So_Module } from './fs_so/fs_So.module';
import { Fg_Go_Module } from './fg_go/fg_Go.module';
//images
import { Image_Suborder_Reduce_Module } from './image_Suborder_Reduce/image_Sub_Order_Reduce.module';
import { Image_Suborder_Add_Module } from './image_Suborder_Add/image_Sub_Order_Add.module';
import { ImageOrderModule } from './imageOrder/imageOrder.module';
//setup
import { SetupOrderModule } from './setupOrder/setupOrder.module';
import { SetupSubOrderModule } from './setupSubOrder/setupSubOrder.module';
import { S_sor_Module } from './s_sor/s_sor.module';
import { S_o_Module } from './s_o/s_o.module';
//order
import { OrderModule } from './order/order.module';
// sub order
import { SubOrder_Add_Module } from './sub_order/sub_order_add/sub_order_add.module';
import { SubOrder_Reduce_Module } from './sub_order/sub_order_reduce/sub_order_reduce.module';

//others
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { MainDatasModule } from './main-datas/main-datas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend les variables d'environnement disponibles globalement
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      /* username: process.env.DB_USERNAME, */
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        //failure
        Failure_go,
        Fg_Go,
        Failure_so,
        Fs_So,
        //image
        Image_Order,
        Image_Suborder_Reduce,
        Image_Suborder_Add,
        //setups
        S_o,
        S_sor,
        SetupSubOrder,
        SetupOrder,
        //order
        Order,
        Sub_Order_Reduce,
        Sub_Order_Add,
      ],
      synchronize: true,
    }),
    UserModule,
    //failure
    FailureGoModule,
    FailureSoModule,
    Fg_Go_Module,
    Fs_So_Module,
    //image
    Image_Suborder_Reduce_Module,
    Image_Suborder_Add_Module,
    ImageOrderModule,
    //setup
    SetupOrderModule,
    SetupSubOrderModule,
    S_sor_Module,
    S_o_Module,
    //order
    OrderModule,
    //sub order
    SubOrder_Add_Module,
    SubOrder_Reduce_Module,
    //others
    UploadModule,
    AuthModule,
    MainDatasModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
