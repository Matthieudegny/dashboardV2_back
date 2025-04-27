import { PartialType } from '@nestjs/mapped-types';
import { CreateTradingBrokerDto } from './create-trading-broker.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTradingBrokerDto extends PartialType(
  CreateTradingBrokerDto,
) {
  @IsNotEmpty()
  @IsNumber()
  trading_broker_id: number;
}
