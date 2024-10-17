import { ApiProperty } from '@nestjs/swagger';

export class Suborder_Reduce_Dto {
  subOrder_reduce_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  subOrder_reduce_order_id: number;
  @ApiProperty({ example: new Date(), description: 'Open Date' })
  subOrder_reduce_openDate: Date;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_reduce_quantityAsset_sold: number;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_reduce_quantityAsset_sold_Perc: number;
  @ApiProperty({ example: 10, description: 'Exit Price' })
  subOrder_reduce_exitPrice: number;
  @ApiProperty({ example: 10, description: 'Result' })
  subOrder_reduce_result: number;
  @ApiProperty({ example: 10, description: 'Amount Sold' })
  subOrder_reduce_amountSold: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  subOrder_reduce_comment: string;
}
