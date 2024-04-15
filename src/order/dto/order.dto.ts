import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  order_id: number;
  @ApiProperty({ description: 'User ID' })
  order_user_id: number;
  @ApiProperty({ description: 'Open Date' })
  order_openDate: Date;
  @ApiProperty({ description: 'Close Date' })
  order_closeDate: Date;
  @ApiProperty({ description: 'Asset' })
  order_asset: string;
  @ApiProperty({ description: 'Quantity' })
  order_quantity: number;
  @ApiProperty({ description: 'Entry Price' })
  order_entryPrice: number;
  @ApiProperty({ description: 'Exit Price' })
  order_exitPrice: number;
  @ApiProperty({ description: '% engaged' })
  order_percentageEngaged: number;
  @ApiProperty({ description: 'Amount engaged' })
  order_amountEngaged: number;
  @ApiProperty({ description: '% stop loss' })
  order_percentageStopLoss: number;
  @ApiProperty({ description: 'Status' })
  order_status: boolean;
  @ApiProperty({ description: 'Result' })
  order_result: number;
  @ApiProperty({ description: 'Comment' })
  order_comment: string;

  @ApiProperty({ description: 'Direction' })
  order_direction: string;
}
