import { PartialType } from '@nestjs/mapped-types';
import { CreateTradingInstrumentDto } from './create-trading-instrument.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTradingInstrumentDto extends PartialType(
  CreateTradingInstrumentDto,
) {
  @IsNotEmpty()
  @IsNumber()
  trading_instrument_id: number;
}
