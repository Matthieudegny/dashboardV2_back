import { ApiProperty } from '@nestjs/swagger';
import { order_directionType } from '../model/model-order_direction';

export class OrderDto {
  order_id: number;
  @ApiProperty({ description: 'User ID' })
  order_user_id: number;
  @ApiProperty({ description: 'Trading Instrument ID' })
  order_trading_classAsset_id: number;
  @ApiProperty({ description: 'Trading Broker ID' })
  order_trading_broker_id: number;
  @ApiProperty({ description: 'Open Date' })
  order_openDate: Date;
  @ApiProperty({ description: 'Asset' })
  order_asset: string;
  @ApiProperty({ description: 'Quantity' })
  order_quantity: number;
  @ApiProperty({ description: 'Entry Price' })
  order_entryPrice: number;
  @ApiProperty({ description: 'Amount engaged' })
  order_amountEngaged: number;
  @ApiProperty({ description: 'Status' })
  order_status: boolean;
  @ApiProperty({ description: 'Result' })
  order_result: number;
  @ApiProperty({ description: 'Comment' })
  order_comment: string | null;
  @ApiProperty({ description: 'is type order' })
  order_isTypeOrder: boolean;
  @ApiProperty({ description: 'Direction' })
  order_direction: order_directionType;

  constructor() {
    this.order_result = 0;
    this.order_status = true;
    this.order_comment = null;
    this.order_isTypeOrder = false;
    this.order_direction = 'LONG';
    this.order_asset = '';
    this.order_entryPrice = 0;
    this.order_amountEngaged = 0;
    this.order_trading_classAsset_id = 0;
    this.order_trading_broker_id = 0;
  }
}
