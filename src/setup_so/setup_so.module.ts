import { Module } from '@nestjs/common';
import { SetupSoService } from './setup_so.service';
import { SetupSoController } from './setup_so.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_So } from 'src/entities/Setup/Setup_So';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_So])],
  controllers: [SetupSoController],
  providers: [SetupSoService],
})
export class SetupSoModule {}
