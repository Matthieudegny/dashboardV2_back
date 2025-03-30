import { ApiProperty } from '@nestjs/swagger';

export class Suborder_Dto {
  subOrder_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  subOrder_order_id: number;
  @ApiProperty({ example: 1, description: 'Id of the user' })
  subOrder_user_id: number;
  @ApiProperty({ example: new Date(), description: 'Open Date' })
  subOrder_openDate: Date;
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
  subOrder_comment: string | null;

  constructor() {
    this.subOrder_id = 0;
    this.subOrder_order_id = 0;
    this.subOrder_user_id = 0;
    this.subOrder_openDate = new Date();
    this.subOrder_quantityAsset_sold = 0;
    this.subOrder_quantityAsset_sold_Perc = 0;
    this.subOrder_exitPrice = 0;
    this.subOrder_result = 0;
    this.subOrder_amountSold = 0;
    this.subOrder_comment = null;
  }
}
