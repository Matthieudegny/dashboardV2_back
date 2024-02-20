import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//entities
import { Failure } from './entities/Failure/Failure';
import { Failure_Go } from './entities/Failure/Failure_go';
import { Failure_So } from './entities/Failure/Failure_so';
import { User } from './entities/User';
import { Image_Go } from './entities/image/Image_go';
import { Image_So } from './entities/image/Image_so';
import { Global_Order } from './entities/Global_Order';
import { Setup_Go } from './entities/setup/Setup_go';
import { Setup_So } from './entities/setup/Setup_so';
import { Setup } from './entities/setup/Setup';
import { Sub_Order } from './entities/Sub_Order';

//modules
import { FailureModule } from './failure/failure.module';
import { UserModule } from './user/user.module';
import { FailureGoModule } from './failure_go/failure_go.module';
import { FailureSoModule } from './failure_so/failure_so.module';
import { ImageSoModule } from './image_so/image_so.module';
import { ImageGoModule } from './image_go/image_go.module';
import { SetupGoModule } from './setup_go/setup_go.module';
import { SetupSoModule } from './setup_so/setup_so.module';
import { SetupModule } from './setup/setup.module';
import { SubOrderModule } from './sub_order/sub_order.module';
import { GlobalOrderModule } from './global_order/global_order.module';
import { UploadModule } from './upload/upload.module';

import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:
        'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
      serveRoot: '/images/',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '$moiLH29!',
      database: 'dashboard',
      entities: [
        Failure,
        Failure_Go,
        Failure_So,
        User,
        Image_Go,
        Image_So,
        Global_Order,
        Setup_Go,
        Setup_So,
        Setup,
        Sub_Order,
      ],
      synchronize: true,
    }),
    FailureModule,
    UserModule,
    FailureGoModule,
    FailureSoModule,
    ImageSoModule,
    ImageGoModule,
    SetupGoModule,
    SetupSoModule,
    SetupModule,
    SubOrderModule,
    GlobalOrderModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
