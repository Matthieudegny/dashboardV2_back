import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTradingClassAssetDto {
  @IsNotEmpty()
  @IsString()
  trading_classAsset_title: string;

  @IsNotEmpty()
  @IsNumber()
  trading_classAsset_user_id: number;
}
