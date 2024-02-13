import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Failure } from './typeorm/entities/Failure/Failure';
import { FailureModule } from './failure/failure.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
