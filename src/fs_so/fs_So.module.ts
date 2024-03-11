import { Module } from '@nestjs/common';
import { Fs_So_Service } from './fs_So.service';
import { Fs_So_Controller } from './fs_So.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fs_So } from '../entities/Failure/Associations/Fs_So';
import { Failure } from '../entities/Failure/Failure';
import { FailureService } from '../failure/failure.service';
import { FailureModule } from '../failure/failure.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fs_So, Failure]), FailureModule],
  controllers: [Fs_So_Controller],
  providers: [Fs_So_Service, FailureService],
  exports: [Fs_So_Service],
})
export class Fs_So_Module {}
