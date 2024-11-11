import { ApiProperty } from '@nestjs/swagger';

import { Setup_Order } from '../../entities/Setup/SetupOrder';
import { Setup_SubOrderDto } from 'src/setup_SubOrder/dto/setup_SubOrder.dto';
import { GlobalOrderDto } from 'src/globalOrder/dto/global_order.dto';
import { FailureSoDto } from 'src/failure_so/dtos/failureSo.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { SetupOrderDto } from '../../setupOrder/dto/setup_go.dto';

export class MainDatasDto {
  @ApiProperty({ description: 'Global order', type: GlobalOrderDto })
  globalOrderList: Array<GlobalOrderDto>;

  @ApiProperty({ description: 'Setup order', type: SetupOrderDto })
  setupOrderList: Array<Setup_Order>;

  @ApiProperty({
    description: 'Setup sub order',
    type: Setup_SubOrderDto,
  })
  setupSubOrderList: Array<Setup_SubOrderDto>;

  // @ApiProperty({ description: 'Failure order', type: FailureGoDto })
  // failureOrderList: Array<FailureGoDto>;

  // @ApiProperty({ description: 'Failure sub order', type: FailureSoDto })
  // failureSubOrderList: Array<FailureSoDto>;
}
