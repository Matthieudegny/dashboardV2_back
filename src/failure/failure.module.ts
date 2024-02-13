import { Module } from '@nestjs/common';
import { FailureController } from './failure.controller';
import { FailureService } from './failure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure } from 'src/entities/Failure/Failure';

@Module({
  //appel de la fonction forFeature de TypeOrmModule pour importer l'entité Failure et l'utilsier dans le module ( services)
  imports: [TypeOrmModule.forFeature([Failure])],
  controllers: [FailureController],
  providers: [FailureService],
})
export class FailureModule {}
