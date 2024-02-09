import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { UsersService } from './services/users/users.service';
import { AnotherMiddleware } from './middlewares/another/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

//implements NestModule  est pour utiliser le middleware
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware)
      .forRoutes('users')
      .apply(AnotherMiddleware)
      .forRoutes('users');
  }
}
