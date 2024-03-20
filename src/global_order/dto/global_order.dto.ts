import { SetupGoDto } from 'src/setup_go/dto/setup_go.dto';
import { ImageGoDto } from 'src/image_go/dto/image_go.dto';

import { ApiProperty } from '@nestjs/swagger';
export class GlobalOrderDto {
  go_id: number;
  @ApiProperty({ description: 'User ID' })
  go_user_id: number;
  @ApiProperty({ description: 'Open Date' })
  go_openDate: Date;
  @ApiProperty({ description: 'Close Date' })
  go_closeDate: Date;
  @ApiProperty({ description: 'Asset' })
  go_asset: string;
  @ApiProperty({ description: 'Quantity' })
  go_quantity: number;
  @ApiProperty({ description: 'Entry Price' })
  go_entryPrice: number;
  @ApiProperty({ description: 'Exit Price' })
  go_exitPrice: number;
  @ApiProperty({ description: '% engaged' })
  go_percentageEngaged: number;
  @ApiProperty({ description: 'Amount engaged' })
  go_amountEngaged: number;
  @ApiProperty({ description: '% stop loss' })
  go_percentageStopLoss: number;
  @ApiProperty({ description: 'Status' })
  go_status: boolean;
  @ApiProperty({ description: 'Result' })
  go_result: number;
  @ApiProperty({ description: 'Comment' })
  go_comment: string;
  @ApiProperty({ description: 'Direction' })
  go_direction: string;
}
