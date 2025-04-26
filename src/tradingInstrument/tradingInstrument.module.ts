import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingInstrumentService } from './tradingInstrument.service';
import { TradingInstrumentController } from './tradingInstrument.controller';
import { TradingInstrument } from '../entities/tradingInstrument/TradingInstrument';

@Module({
  imports: [TypeOrmModule.forFeature([TradingInstrument])],
  controllers: [TradingInstrumentController],
  providers: [TradingInstrumentService],
  exports: [TradingInstrumentService],
})
export class TradingInstrumentModule {}
