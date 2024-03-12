import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

//guards
import { AuthGuard } from './auth/auth.guard';

//entities
import { Failure_go } from './entities/Failure/Failure_go';
import { Fg_Go } from './entities/Failure/Associations/Fg_go';
import { Failure_so } from './entities/Failure/Failure_so';
import { Fs_So } from './entities/Failure/Associations/Fs_So';
import { User } from './entities/User';
import { Image_Go } from './entities/image/Image_go';
import { Image_So } from './entities/image/Image_so';
import { Global_Order } from './entities/Global_Order';
import { Setup_Go } from './entities/setup/Setup_go';
import { Setup_So } from './entities/setup/Setup_so';
import { Setup } from './entities/setup/Setup';
import { Sub_Order } from './entities/Sub_Order';

//modules
import { UserModule } from './user/user.module';
//failures
import { FailureGoModule } from './failure_go/failure_go.module';
import { FailureSoModule } from './failure_so/failure_so.module';
import { Fs_So_Module } from './fs_so/fs_So.module';
import { Fg_Go_Module } from './fg_go/fg_Go.module';
//images
import { ImageSoModule } from './image_so/image_so.module';
import { ImageGoModule } from './image_go/image_go.module';
//setup
import { SetupGoModule } from './setup_go/setup_go.module';
import { SetupSoModule } from './setup_so/setup_so.module';
import { SetupModule } from './setup/setup.module';
//order
import { SubOrderModule } from './sub_order/sub_order.module';
import { GlobalOrderModule } from './global_order/global_order.module';
//others
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { MainDatasModule } from './main-datas/main-datas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend les variables d'environnement disponibles globalement
    }),
    ServeStaticModule.forRoot({
      rootPath:
        'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
      serveRoot: '/images/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
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
        Image_Go,
        Image_So,
        //setups
        Setup_Go,
        Setup_So,
        Setup,
        //order
        Global_Order,
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
    ImageSoModule,
    ImageGoModule,
    //setup
    SetupGoModule,
    SetupSoModule,
    SetupModule,
    //order
    SubOrderModule,
    GlobalOrderModule,
    //others
    UploadModule,
    AuthModule,
    MainDatasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
