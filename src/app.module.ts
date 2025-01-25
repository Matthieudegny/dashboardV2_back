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
import { Image_Suborder } from './entities/image/Image_Suborder';
import { Order } from './entities/Order';
import { S_o } from './entities/Setup/Associations/S_o';
import { S_so } from './entities/Setup/Associations/S_so';
import { Setup_SubOrder } from './entities/Setup/Setup_SubOrder';
import { Setup_Order } from './entities/Setup/SetupOrder';
import { Suborder } from './entities/Suborder';

//modules
import { UserModule } from './user/user.module';
//failures
import { FailureGoModule } from './failure_go/failure_go.module';
import { FailureSoModule } from './failure_so/failure_so.module';
import { Fs_So_Module } from './fs_so/fs_So.module';
import { Fg_Go_Module } from './fg_go/fg_Go.module';
//images
import { Image_Suborder_Module } from './image_Suborder/image_Sub_Order.module';
import { ImageOrderModule } from './imageOrder/imageOrder.module';
//setup
import { SetupOrderModule } from './setupOrder/setupOrder.module';
import { Setup_SubOrder_Module } from './setup_SubOrder/setup_SubOrder.module';
import { S_so_Module } from './s_so/s_so.module';
import { S_o_Module } from './s_o/s_o.module';
//order
import { OrderModule } from './order/order.module';
// sub order
import { SubOrder_Module } from './sub_order/suborder.module';

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
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10) || 3306,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      url: process.env.MYSQL_URL,
      entities: [
        User,
        //failure
        Failure_go,
        Fg_Go,
        Failure_so,
        Fs_So,
        //image
        Image_Order,
        Image_Suborder,
        //setups
        S_o,
        S_so,

        Setup_SubOrder,
        Setup_Order,

        //order
        Order,
        Suborder,
      ],
      synchronize: false,
    }),
    UserModule,
    //failure
    FailureGoModule,
    FailureSoModule,
    Fg_Go_Module,
    Fs_So_Module,
    //image
    Image_Suborder_Module,
    ImageOrderModule,
    //setup
    SetupOrderModule,
    Setup_SubOrder_Module,
    S_so_Module,
    S_o_Module,
    //order
    OrderModule,
    //sub order
    SubOrder_Module,
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
