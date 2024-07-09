import { Injectable } from '@nestjs/common';
import { MainDatasDto } from './dto/main-datas.dto';

//Services
import { OrderService } from '../order/order.service';
import { SetupSubOrderService } from 'src/setupSubOrder/setupSubOrder.service';
import { SetupOrderService } from 'src/setupOrder/setupOrder.service';
import { FailureGoService } from 'src/failure_go/failure_go.service';
import { FailureSoService } from 'src/failure_so/failure_so.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly orderService: OrderService,
    private readonly setupSoService: SetupSubOrderService,
    private readonly setupGoService: SetupOrderService,
    private readonly failureGoService: FailureGoService,
    private readonly failureSoService: FailureSoService,
    private readonly userService: UserService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    //check if user is present in DBB
    const userIsAllowed = await this.userService.findOne(idUser);
    if (!userIsAllowed) {
      throw new Error('User not found');
    }

    const mainDatas = new MainDatasDto();
    try {
      //1. first the categories data
      mainDatas.setupOrderList =
        await this.setupGoService.findAllSetupGoByIdUser(idUser);
      mainDatas.setupSubOrderList =
        await this.setupSoService.findAllSetupSoByIdUser(idUser);
      mainDatas.failureOrderList =
        await this.failureGoService.findAllFailureByIdUSer(idUser);
      mainDatas.failureSubOrderList =
        await this.failureSoService.findAllFailureByIdUser(idUser);

      //2 then the global orders data (filles with images, setups, failures, and the list of suborders)
      mainDatas.globalOrderList =
        await this.orderService.findAllGlobalOrdersByIdUserFilledWithData(
          idUser,
        );
    } catch (error) {
      console.log('Error in MainDatasService.findMainDatasbyIdUser', error);
      throw error;
    }

    return mainDatas;
  }
}
