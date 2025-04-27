import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TradingBrokerService } from './tradingBroker.service';
import { TradingBroker } from '../entities/tradingBroker/TradingBroker';
import { CreateTradingBrokerDto } from './dto/create-trading-broker.dto';
import { UpdateTradingBrokerDto } from './dto/update-trading-broker.dto';

@Controller('trading-broker')
export class TradingBrokerController {
  constructor(private readonly tradingBrokerService: TradingBrokerService) {}

  @Get()
  findAll(): Promise<TradingBroker[]> {
    return this.tradingBrokerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TradingBroker> {
    return this.tradingBrokerService.findOne(+id);
  }

  @Post()
  create(
    @Body() createTradingBrokerDto: CreateTradingBrokerDto,
  ): Promise<TradingBroker> {
    return this.tradingBrokerService.create(createTradingBrokerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradingBrokerDto: UpdateTradingBrokerDto,
  ): Promise<boolean> {
    return this.tradingBrokerService.update(+id, updateTradingBrokerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.tradingBrokerService.remove(+id);
  }
}
