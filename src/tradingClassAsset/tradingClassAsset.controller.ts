import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TradingClassAssetService } from './tradingClassAsset.service';
import { TradingClassAsset } from '../entities/tradingClassAsset/TradingClassAsset';
import { CreateTradingClassAssetDto } from './dto/create-trading-classAsset.dto';
import { UpdateTradingClassAssetDto } from './dto/update-trading-classAsset.dto';

@Controller('trading-classAsset')
export class TradingClassAssetController {
  constructor(
    private readonly tradingClassAssetService: TradingClassAssetService,
  ) {}

  @Get()
  findAll(): Promise<TradingClassAsset[]> {
    return this.tradingClassAssetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TradingClassAsset> {
    return this.tradingClassAssetService.findOne(+id);
  }

  @Post()
  create(
    @Body() createTradingClassAssetDto: CreateTradingClassAssetDto,
  ): Promise<TradingClassAsset> {
    return this.tradingClassAssetService.create(createTradingClassAssetDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradingClassAssetDto: UpdateTradingClassAssetDto,
  ): Promise<boolean> {
    return this.tradingClassAssetService.update(
      +id,
      updateTradingClassAssetDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.tradingClassAssetService.remove(+id);
  }
}
