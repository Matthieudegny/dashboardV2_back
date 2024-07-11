import { Module } from '@nestjs/common';
import { Fs_SoService } from './fs_So.service';
import { Fs_So_Controller } from './fs_So.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fs_So } from '../entities/Failure/Associations/Fs_So';
import { FailureSoModule } from '../failure_so/failure_so.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fs_So]), FailureSoModule],
  controllers: [Fs_So_Controller],
  providers: [Fs_SoService],
  exports: [Fs_SoService],
})
export class Fs_So_Module {}
