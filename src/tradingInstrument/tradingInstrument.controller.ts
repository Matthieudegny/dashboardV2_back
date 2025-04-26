import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TradingInstrumentService } from './tradingInstrument.service';
import { TradingInstrument } from '../entities/tradingInstrument/TradingInstrument';
import { CreateTradingInstrumentDto } from './dto/create-trading-instrument.dto';
import { UpdateTradingInstrumentDto } from './dto/update-trading-instrument.dto';

@Controller('trading-instrument')
export class TradingInstrumentController {
  constructor(
    private readonly tradingInstrumentService: TradingInstrumentService,
  ) {}

  @Get()
  findAll(): Promise<TradingInstrument[]> {
    return this.tradingInstrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TradingInstrument> {
    return this.tradingInstrumentService.findOne(+id);
  }

  @Post()
  create(
    @Body() createTradingInstrumentDto: CreateTradingInstrumentDto,
  ): Promise<TradingInstrument> {
    return this.tradingInstrumentService.create(createTradingInstrumentDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradingInstrumentDto: UpdateTradingInstrumentDto,
  ): Promise<TradingInstrument> {
    return this.tradingInstrumentService.update(
      +id,
      updateTradingInstrumentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tradingInstrumentService.remove(+id);
  }
}
