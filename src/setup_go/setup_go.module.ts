import { Module } from '@nestjs/common';
import { SetupGoService } from './setup_go.service';
import { SetupGoController } from './setup_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_Go } from '../entities/Setup/Setup_go';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_Go])],
  controllers: [SetupGoController],
  providers: [SetupGoService],
})
export class SetupGoModule {}
