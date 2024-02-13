import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Failure } from './entities/Failure/Failure';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '$moiLH29!',
      database: 'dashboard',
      entities: [Failure],
      synchronize: true,
    }),
    UsersModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
