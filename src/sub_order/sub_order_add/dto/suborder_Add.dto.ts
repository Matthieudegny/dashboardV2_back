import { ApiProperty } from '@nestjs/swagger';

export class Sub_Order_Add_Dto {
  subOrder_add_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  subOrder_add_order_id: number;
  @ApiProperty({ example: new Date(), description: 'Close Date' })
  subOrder_add_openDate: Date;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_add_quantityAsset_bought: number;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_add_quantityAsset_bought_Perc: number;
  @ApiProperty({ example: 10, description: 'Entry Price' })
  subOrder_add_entryPrice: number;
  @ApiProperty({ example: 10, description: 'Amount Bought' })
  subOrder_add_amountBought: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  subOrder_add_comment: string;
  @ApiProperty({ example: 10, description: 'Percentage Engaged' })
  subOrder_add_percentageEngaged: number;
}
