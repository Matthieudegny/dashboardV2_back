import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradingBroker } from '../entities/tradingBroker/TradingBroker';

@Injectable()
export class TradingBrokerService {
  constructor(
    @InjectRepository(TradingBroker)
    private tradingBrokerRepository: Repository<TradingBroker>,
  ) {}

  async findAll(): Promise<TradingBroker[]> {
    return this.tradingBrokerRepository.find();
  }

  async findAllByUserId(userId: number): Promise<TradingBroker[]> {
    return this.tradingBrokerRepository.find({
      where: { trading_broker_user_id: userId },
    });
  }

  async findOne(id: number): Promise<TradingBroker> {
    return this.tradingBrokerRepository.findOne({
      where: { trading_broker_id: id },
    });
  }

  async create(tradingBroker: Partial<TradingBroker>): Promise<TradingBroker> {
    try {
      const newTradingBroker =
        this.tradingBrokerRepository.create(tradingBroker);
      return await this.tradingBrokerRepository.save(newTradingBroker);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    tradingBroker: Partial<TradingBroker>,
  ): Promise<boolean> {
    try {
      const result = await this.tradingBrokerRepository.update(
        id,
        tradingBroker,
      );
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.tradingBrokerRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }
}
