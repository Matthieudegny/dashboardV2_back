import { Module } from '@nestjs/common';
import { FailureController } from './controllers/failure/failure.controller';
import { FailureService } from './services/failure/failure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Failure } from 'src/typeorm/entities/Failure/Failure';

@Module({
  //appel de la fonction forFeature de TypeOrmModule pour importer l'entité Failure et l'utilsier dans le module ( services)
  imports: [TypeOrmModule.forFeature([Failure])],
  controllers: [FailureController],
  providers: [FailureService],
})
export class FailureModule {}
