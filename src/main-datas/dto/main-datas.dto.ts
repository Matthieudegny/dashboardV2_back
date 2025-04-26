import { Setup_Order } from '../../entities/Setup/SetupOrder';
import { Setup_SubOrderDto } from 'src/setup_SubOrder/dto/setup_SubOrder.dto';
import { GlobalOrderDto } from 'src/globalOrder/dto/global_order.dto';
import { FailureSoDto } from 'src/failure_so/dtos/failureSo.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { SetupOrderDto } from '../../setupOrder/dto/setup_go.dto';
import { Suborder_Dto } from 'src/sub_order/dto/suborder.dto';
import { PublicUserDto } from 'src/user/dto/user.dto';
import { TradingInstrument } from '../../entities/tradingInstrument/TradingInstrument';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderDto>;
  subOrderList: Array<Suborder_Dto>;
  setupOrderList: Array<Setup_Order>;
  setupSubOrderList: Array<Setup_SubOrderDto>;
  userInfos: PublicUserDto;
  tradingInstrumentList: Array<TradingInstrument>;
  // @ApiProperty({ description: 'Failure order', type: FailureGoDto })
  // failureOrderList: Array<FailureGoDto>;

  // @ApiProperty({ description: 'Failure sub order', type: FailureSoDto })
  // failureSubOrderList: Array<FailureSoDto>;
  constructor() {
    this.globalOrderList = [];
    this.subOrderList = [];
    this.setupOrderList = [];
    this.setupSubOrderList = [];
    this.userInfos = new PublicUserDto();
    this.tradingInstrumentList = [];
  }
}
