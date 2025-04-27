import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTradingBrokerDto {
  @IsNotEmpty()
  @IsString()
  trading_broker_title: string;

  @IsNotEmpty()
  @IsNumber()
  trading_broker_user_id: number;
}
