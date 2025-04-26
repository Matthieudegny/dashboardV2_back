import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTradingInstrumentDto {
  @IsNotEmpty()
  @IsString()
  trading_instrument_title: string;

  @IsNotEmpty()
  @IsNumber()
  trading_instrument_user_id: number;
}
