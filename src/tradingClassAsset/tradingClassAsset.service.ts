import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradingClassAsset } from 'src/entities/tradingClassAsset/TradingClassAsset';

@Injectable()
export class TradingClassAssetService {
  constructor(
    @InjectRepository(TradingClassAsset)
    private tradingClassAssetRepository: Repository<TradingClassAsset>,
  ) {}

  async findAll(): Promise<TradingClassAsset[]> {
    return this.tradingClassAssetRepository.find();
  }

  async findAllByUserId(userId: number): Promise<TradingClassAsset[]> {
    return this.tradingClassAssetRepository.find({
      where: { trading_classAsset_user_id: userId },
    });
  }

  async findOne(id: number): Promise<TradingClassAsset> {
    return this.tradingClassAssetRepository.findOne({
      where: { trading_classAsset_id: id },
    });
  }

  async create(
    tradingClassAsset: Partial<TradingClassAsset>,
  ): Promise<TradingClassAsset> {
    try {
      const newTradingClassAsset =
        this.tradingClassAssetRepository.create(tradingClassAsset);
      return await this.tradingClassAssetRepository.save(newTradingClassAsset);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    tradingClassAsset: Partial<TradingClassAsset>,
  ): Promise<boolean> {
    try {
      const result = await this.tradingClassAssetRepository.update(
        id,
        tradingClassAsset,
      );
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.tradingClassAssetRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }
}
