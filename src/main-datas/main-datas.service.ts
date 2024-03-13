import { Injectable } from '@nestjs/common';
import { MainDatasDto } from './dto/main-datas.dto';

//Services
import { GlobalOrderService } from '../global_order/global_order.service';
import { SetupSoService } from 'src/setup_so/setupSo.service';
import { SetupGoService } from 'src/setup_go/setupGo.service';
import { FailureGoService } from 'src/failure_go/failure_go.service';
import { FailureSoService } from 'src/failure_so/failure_so.service';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly globalOrderService: GlobalOrderService,
    private readonly setupSoService: SetupSoService,
    private readonly setupGoService: SetupGoService,
    private readonly failureGoService: FailureGoService,
    private readonly failureSoService: FailureSoService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    const mainDatas = new MainDatasDto();
    try {
      //1. first the categories data
      mainDatas.setupGoList =
        await this.setupGoService.findAllSetupGoByIdUser(idUser);
      mainDatas.setupSoList =
        await this.setupSoService.findAllSetupSoByIdUser(idUser);
      mainDatas.failureGoList =
        await this.failureGoService.findAllFailureByIdUSer(idUser);
      mainDatas.failureSoList =
        await this.failureSoService.findAllFailureByIdUser(idUser);

      //2 then the global orders data (filles with images, setups, failures, and the list of suborders)
      mainDatas.globalOrderList =
        await this.globalOrderService.findAllGlobalOrdersByIdUserFilledWithData(
          idUser,
        );
    } catch (error) {
      console.log('Error in MainDatasService.findMainDatasbyIdUser', error);
      throw error;
    }

    return mainDatas;
  }
}
