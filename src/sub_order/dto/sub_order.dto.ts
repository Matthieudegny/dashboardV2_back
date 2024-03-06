import { ApiProperty } from '@nestjs/swagger';
export class SubOrderDto {
  so_id: number;
  @ApiProperty({ example: 1, description: 'Id of the global order' })
  so_go_id: number;
  @ApiProperty({ example: new Date(), description: 'Open Date' })
  so_openDate: Date;
  @ApiProperty({ example: new Date(), description: 'Close Date' })
  so_closeDate: Date;
  @ApiProperty({ example: '10', description: 'Quantity' })
  so_quantity: number;
  @ApiProperty({ example: 10, description: 'Entry Price' })
  so_entryPrice: number;
  @ApiProperty({ example: 10, description: 'Amount Engaged' })
  so_amountEngaged: number;
  @ApiProperty({ example: 10, description: 'Exit Price' })
  so_exitPrice: number;
  @ApiProperty({ example: true, description: 'Statut' })
  so_status: boolean;
  @ApiProperty({ example: 10, description: 'Result' })
  so_result: number;
  @ApiProperty({ example: 'Comment', description: 'Comment' })
  so_comment: string;
}
