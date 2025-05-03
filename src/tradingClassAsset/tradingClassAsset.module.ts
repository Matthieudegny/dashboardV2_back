import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingClassAssetService } from './tradingClassAsset.service';
import { TradingClassAssetController } from './tradingClassAsset.controller';
import { TradingClassAsset } from '../entities/tradingClassAsset/TradingClassAsset';

@Module({
  imports: [TypeOrmModule.forFeature([TradingClassAsset])],
  controllers: [TradingClassAssetController],
  providers: [TradingClassAssetService],
  exports: [TradingClassAssetService],
})
export class TradingInstrumentModule {}
