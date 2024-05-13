import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SsoService } from './sso.service';
import { SsoController } from './sso.controller';
import { Sso } from '../entities/Setup/Associations/Sso';

import { SetupSubOrderModule } from '../setupSubOrder/setupSubOrder.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sso]), SetupSubOrderModule],
  controllers: [SsoController],
  providers: [SsoService],
  exports: [SsoService],
})
export class Sso_Module {}
