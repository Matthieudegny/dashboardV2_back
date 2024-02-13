import { Module } from '@nestjs/common';
import { SetupSoService } from './setup_so.service';
import { SetupSoController } from './setup_so.controller';

@Module({
  controllers: [SetupSoController],
  providers: [SetupSoService],
})
export class SetupSoModule {}
