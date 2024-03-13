import { Module } from '@nestjs/common';
import { SetupGoService } from './setupGo.service';
import { SetupGoController } from './setupGo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_go } from '../entities/Setup/Setup_go';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_go])],
  controllers: [SetupGoController],
  providers: [SetupGoService],
  exports: [SetupGoService],
})
export class SetupGoModule {}
