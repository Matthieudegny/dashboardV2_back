import { Setup_Order } from '../../entities/Setup/SetupOrder';
import { GlobalOrderDto } from 'src/globalOrder/dto/global_order.dto';
import { Suborder_Dto } from 'src/sub_order/dto/suborder.dto';
import { PublicUserDto } from 'src/user/dto/user.dto';
import { TradingInstrument } from '../../entities/tradingInstrument/TradingInstrument';
import { TradingBroker } from '../../entities/tradingBroker/TradingBroker';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderDto>;
  subOrderList: Array<Suborder_Dto>;
  setupOrderList: Array<Setup_Order>;
  userInfos: PublicUserDto;
  tradingInstrumentList: Array<TradingInstrument>;
  tradingBrokerList: Array<TradingBroker>;
  // @ApiProperty({ description: 'Failure order', type: FailureGoDto })
  // failureOrderList: Array<FailureGoDto>;

  // @ApiProperty({ description: 'Failure sub order', type: FailureSoDto })
  // failureSubOrderList: Array<FailureSoDto>;
  constructor() {
    this.globalOrderList = [];
    this.subOrderList = [];
    this.setupOrderList = [];
    this.userInfos = new PublicUserDto();
    this.tradingInstrumentList = [];
    this.tradingBrokerList = [];
  }
}
