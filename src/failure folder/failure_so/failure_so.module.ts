import { Module } from '@nestjs/common';
import { FailureSoController } from './failure_so.controller';
import { FailureSo_Service } from './failure_so.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure_so } from '../../entities/Failure/Failure_so';

@Module({
  //appel de la fonction forFeature de TypeOrmModule pour importer l'entité Failure et l'utilsier dans le module ( services)
  imports: [TypeOrmModule.forFeature([Failure_so])],
  controllers: [FailureSoController],
  providers: [FailureSo_Service],
  exports: [FailureSo_Service],
})
export class FailureSoModule {}
