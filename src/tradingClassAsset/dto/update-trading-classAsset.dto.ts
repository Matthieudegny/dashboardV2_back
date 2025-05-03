import { PartialType } from '@nestjs/mapped-types';
import { CreateTradingClassAssetDto } from './create-trading-classAsset.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTradingClassAssetDto extends PartialType(
  CreateTradingClassAssetDto,
) {
  @IsNotEmpty()
  @IsNumber()
  trading_classAsset_id: number;
}
