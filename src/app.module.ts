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
import { Image_SubOrder } from './entities/image/ImageSubOrder';
import { Order } from './entities/Order';
import { So } from './entities/Setup/Associations/So';
import { Sso } from './entities/Setup/Associations/Sso';
import { SetupOrder } from './entities/Setup/SetupOrder';
import { Sub_Order } from './entities/Sub_Order';

//modules
import { UserModule } from './user/user.module';
//failures
import { FailureGoModule } from './failure_go/failure_go.module';
import { FailureSoModule } from './failure_so/failure_so.module';
import { Fs_So_Module } from './fs_so/fs_So.module';
import { Fg_Go_Module } from './fg_go/fg_Go.module';
//images
import { ImageSubOrderModule } from './imageSubOrder/imageSubOrder.module';
import { ImageOrderModule } from './imageOrder/imageOrder.module';
//setup
import { SetupOrderModule } from './setupOrder/setupOrder.module';
import { SetupSubOrderModule } from './setupSubOrder/setupSubOrder.module';
import { Sso_Module } from './sso/sso.module';
import { So_Module } from './so/so.module';
//order
import { SubOrderModule } from './sub_order/sub_order.module';
import { OrderModule } from './order/order.module';
//others
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { MainDatasModule } from './main-datas/main-datas.module';
import { SetupSubOrder } from './entities/Setup/SetupSubOrder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend les variables d'environnement disponibles globalement
    }),
    // ServeStaticModule.forRoot({
    //   rootPath:
    //     'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
    //   serveRoot: '/images/',
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      /* username: process.env.DB_USERNAME, */
      username: 'root',
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
        Image_SubOrder,
        //setups
        So,
        Sso,
        SetupSubOrder,
        SetupOrder,
        //order
        Order,
        Sub_Order,
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
    ImageSubOrderModule,
    ImageOrderModule,
    //setup
    SetupOrderModule,
    SetupSubOrderModule,
    Sso_Module,
    So_Module,
    //order
    SubOrderModule,
    OrderModule,
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
