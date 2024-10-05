import { ApiProperty } from '@nestjs/swagger';
import { suborder_directionType } from '../model/model-suborder_direction';

export class Sub_Order_Add_Dto {
  subOrder_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  subOrder_order_id: number;
  @ApiProperty({ example: new Date(), description: 'Close Date' })
  subOrder_openDate: Date;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_quantityAsset_bought: number;
  @ApiProperty({ example: '10', description: 'QuantityAsset' })
  subOrder_quantityAsset_bought_Perc: number;
  @ApiProperty({ example: 10, description: 'Entry Price' })
  subOrder_entryPrice: number;
  @ApiProperty({ example: 10, description: 'Amount Bought' })
  subOrder_amountBought: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  subOrder_comment: string;
  @ApiProperty({ example: 'REDUCE', description: 'Direction' })
  subOrder_direction: suborder_directionType;
}
