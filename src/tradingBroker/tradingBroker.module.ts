import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingBrokerService } from './tradingBroker.service';
import { TradingBrokerController } from './tradingBroker.controller';
import { TradingBroker } from '../entities/tradingBroker/TradingBroker';

@Module({
  imports: [TypeOrmModule.forFeature([TradingBroker])],
  controllers: [TradingBrokerController],
  providers: [TradingBrokerService],
  exports: [TradingBrokerService],
})
export class TradingBrokerModule {}
