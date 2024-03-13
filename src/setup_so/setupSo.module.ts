import { Module } from '@nestjs/common';
import { SetupSoService } from './setupSo.service';
import { SetupSoController } from './setupSo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_so } from '../entities/Setup/Setup_so';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_so])],
  controllers: [SetupSoController],
  providers: [SetupSoService],
  exports: [SetupSoService],
})
export class SetupSoModule {}
