import { Injectable } from '@nestjs/common';
import { MainDatasDto } from './dto/main-datas.dto';

//Services
import { GlobalOrderService } from '../global_order/global_order.service';
import { SetupService } from '../setup/setup.service';
import { FailureGoService } from 'src/failure_go/failure_go.service';
import { FailureSoService } from 'src/failure_so/failure_so.service';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly globalOrderService: GlobalOrderService,
    private readonly setupService: SetupService,
    private readonly failureGoService: FailureGoService,
    private readonly failureSoService: FailureSoService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    const mainDatas = new MainDatasDto();
    try {
      //1. first the categories data
      mainDatas.setupList = await this.setupService.findAll();
      mainDatas.failureGoList = await this.failureGoService.findAllFailure();
      mainDatas.failureSoList = await this.failureSoService.findAllFailure();

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
