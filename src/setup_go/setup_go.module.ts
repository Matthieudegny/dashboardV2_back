import { Module } from '@nestjs/common';
import { SetupGoService } from './setup_go.service';
import { SetupGoController } from './setup_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_Go } from '../entities/setup/Setup_go';
import { Setup } from '../entities/setup/Setup';
import { SetupService } from 'src/setup/setup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_Go, Setup])],
  controllers: [SetupGoController],
  providers: [SetupGoService, SetupService],
  exports: [SetupGoService],
})
export class SetupGoModule {}
