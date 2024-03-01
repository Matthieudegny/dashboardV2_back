import { Injectable } from '@nestjs/common';
import { MainDatasDto } from './dto/main-datas.dto';

//Services
import { GlobalOrderService } from '../global_order/global_order.service';
import { SetupService } from '../setup/setup.service';
import { FailureService } from '../failure/failure.service';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly globalOrderService: GlobalOrderService,
    private readonly setupService: SetupService,
    private readonly failureService: FailureService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    const mainDatas = new MainDatasDto();
    try {
      //1. first the categories data
      mainDatas.setupList = await this.setupService.findAll();
      mainDatas.failureList = await this.failureService.findAllFailure();

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
