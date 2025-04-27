import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradingInstrument } from '../entities/tradingInstrument/TradingInstrument';

@Injectable()
export class TradingInstrumentService {
  constructor(
    @InjectRepository(TradingInstrument)
    private tradingInstrumentRepository: Repository<TradingInstrument>,
  ) {}

  async findAll(): Promise<TradingInstrument[]> {
    return this.tradingInstrumentRepository.find();
  }

  async findAllByUserId(userId: number): Promise<TradingInstrument[]> {
    return this.tradingInstrumentRepository.find({
      where: { trading_instrument_user_id: userId },
    });
  }

  async findOne(id: number): Promise<TradingInstrument> {
    return this.tradingInstrumentRepository.findOne({
      where: { trading_instrument_id: id },
    });
  }

  async create(
    tradingInstrument: Partial<TradingInstrument>,
  ): Promise<TradingInstrument> {
    try {
      const newTradingInstrument =
        this.tradingInstrumentRepository.create(tradingInstrument);
      return await this.tradingInstrumentRepository.save(newTradingInstrument);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    tradingInstrument: Partial<TradingInstrument>,
  ): Promise<boolean> {
    try {
      const result = await this.tradingInstrumentRepository.update(
        id,
        tradingInstrument,
      );
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.tradingInstrumentRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      return false;
    }
  }
}
