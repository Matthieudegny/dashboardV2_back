import { ApiProperty } from '@nestjs/swagger';
export class SubOrderDto {
  @ApiProperty({ example: 1, description: 'suborder id' })
  so_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  so_order_id: number;
  @ApiProperty({ example: new Date(), description: 'Close Date' })
  so_closeDate: Date;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  so_quantityAsset_sold: number;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  so_quantityAsset_sold_Perc: number;
  @ApiProperty({ example: 10, description: 'Exit Price' })
  so_exitPrice: number;
  @ApiProperty({ example: 10, description: 'Result' })
  so_result: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  so_comment: string;
}
