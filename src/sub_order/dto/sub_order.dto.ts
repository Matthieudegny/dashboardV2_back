import { ApiProperty } from '@nestjs/swagger';
export class SubOrderDto {
  subOrder_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  subOrder_order_id: number;
  @ApiProperty({ example: new Date(), description: 'Close Date' })
  subOrder_closeDate: Date;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_quantityAsset_sold: number;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_quantityAsset_sold_Perc: number;
  @ApiProperty({ example: 10, description: 'Exit Price' })
  subOrder_exitPrice: number;
  @ApiProperty({ example: 10, description: 'Result' })
  subOrder_result: number;
  @ApiProperty({ example: 10, description: 'Amount Sold' })
  subOrder_amountSold: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  subOrder_comment: string;
}
