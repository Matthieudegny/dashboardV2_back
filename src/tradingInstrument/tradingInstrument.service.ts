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
    const newTradingInstrument =
      this.tradingInstrumentRepository.create(tradingInstrument);
    return this.tradingInstrumentRepository.save(newTradingInstrument);
  }

  async update(
    id: number,
    tradingInstrument: Partial<TradingInstrument>,
  ): Promise<TradingInstrument> {
    await this.tradingInstrumentRepository.update(id, tradingInstrument);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tradingInstrumentRepository.delete(id);
  }
}
