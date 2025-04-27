import { Injectable, NotFoundException } from '@nestjs/common';
import { MainDatasDto } from './dto/main-datas.dto';

//Services
import { SetupOrderService } from 'src/setupOrder/setupOrder.service';
import { UserService } from 'src/user/user.service';
import { Global_Order_Service } from 'src/globalOrder/global_order_service';
import { TradingInstrumentService } from 'src/tradingInstrument/tradingInstrument.service';
import { TradingBrokerService } from 'src/tradingBroker/tradingBroker.service';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly SetupOrderService: SetupOrderService,
    private readonly userService: UserService,
    private readonly globalOrderService: Global_Order_Service,
    private readonly tradingInstrumentService: TradingInstrumentService,
    private readonly tradingBrokerService: TradingBrokerService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    //check if user is present in DBB
    const userIsAllowed = await this.userService.findOne(idUser);
    if (!userIsAllowed) {
      throw new NotFoundException(`User with ID ${idUser} not found`);
    }

    const mainDatas = new MainDatasDto();
    try {
      //1. first the categories data (list setup for order and suborder)
      mainDatas.setupOrderList =
        await this.SetupOrderService.findAllSetupGoByIdUser(idUser);

      //2 then the global orders data (filles with images, setups, failures, and the list of global suborders) + the list of suborders
      const globalOrderListPlusSubOrderList =
        await this.globalOrderService.findAllGlobalOrderByIdUserPlusListSubOrder(
          idUser,
        );
      mainDatas.globalOrderList =
        globalOrderListPlusSubOrderList.listGlobalOrder;
      mainDatas.subOrderList = globalOrderListPlusSubOrderList.listSubOrder;

      //3 then the user infos (initial capital amount + name + email)
      mainDatas.userInfos =
        await this.userService.findUserInfosByIdUser(idUser);

      //4 get the trading instruments for the user
      mainDatas.tradingInstrumentList =
        await this.tradingInstrumentService.findAllByUserId(idUser);

      //5 get the trading brokers for the user
      mainDatas.tradingBrokerList =
        await this.tradingBrokerService.findAllByUserId(idUser);
    } catch (error) {
      console.log('Error in MainDatasService.findMainDatasbyIdUser', error);
      throw error;
    }
    return mainDatas;
  }
}
