import { Module } from '@nestjs/common';
import { Fs_So_Service } from './fs_So.service';
import { Fs_So_Controller } from './fs_So.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_so } from '../../entities/Failure/Failure_so';
import { Fs_So } from '../../entities/Failure/Associations/Fs_So';
import { FailureSoModule } from '../failure_so/failure_so.module';
import { FailureSo_Service } from '../failure_so/failure_so.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fs_So, Failure_so]), FailureSoModule],
  controllers: [Fs_So_Controller],
  providers: [Fs_So_Service, FailureSo_Service],
  exports: [Fs_So_Service],
})
export class Fs_So_Module {}
