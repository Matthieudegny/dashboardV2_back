import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SsoService } from './sso.service';
import { SsoController } from './sso.controller';
import { Ss_So } from '../entities/Setup/Associations/Ss';

import { SetupSoModule } from '../setup_so/setupSo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ss_So]), SetupSoModule],
  controllers: [SsoController],
  providers: [SsoService],
  exports: [SsoService],
})
export class Sso_Module {}
