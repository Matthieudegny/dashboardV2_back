import { Module } from '@nestjs/common';
import { SetupSoService } from './setup_so.service';
import { SetupSoController } from './setup_so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_So } from '../entities/setup/Setup_so';
import { Setup } from '../entities/setup/Setup';
import { SetupService } from 'src/setup/setup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_So, Setup])],
  controllers: [SetupSoController],
  providers: [SetupSoService, SetupService],
  exports: [SetupSoService],
})
export class SetupSoModule {}
