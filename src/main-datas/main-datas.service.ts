import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Services
import { GlobalOrderService } from '../global_order/global_order.service';
import { SetupGoService } from '../setup_go/setup_go.service';
import { SetupService } from '../setup/setup.service';
import { SetupSoService } from '../setup_so/setup_so.service';
import { ImageGoService } from '../image_go/image_go.service';
import { ImageSoService } from '../image_so/image_so.service';
import { FailureService } from '../failure/failure.service';
import { FailureGoService } from '../failure_go/failure_go.service';
import { FailureSoService } from '../failure_so/failure_so.service';
import { SubOrderService } from '../sub_order/sub_order.service';

//dto
import { GlobalOrderDto } from '../global_order/dto/global_order.dto';
import { SubOrderDto } from '../sub_order/dto/sub_order.dto';
import { MainDatasDto } from './dto/main-datas.dto';
import { GlobalOrderFillWithDatasDto } from './dto/main-datas.dto';
import { SubOrderFillWithDatasDto } from './dto/main-datas.dto';

@Injectable()
export class MainDatasService {
  constructor(
    private readonly globalOrderService: GlobalOrderService,
    private readonly setupGoService: SetupGoService,
    private readonly setupService: SetupService,
    private readonly setupSoService: SetupSoService,
    private readonly imageGoService: ImageGoService,
    private readonly imageSoService: ImageSoService,
    private readonly failureService: FailureService,
    private readonly failureGoService: FailureGoService,
    private readonly failureSoService: FailureSoService,
    private readonly subOrderService: SubOrderService,
  ) {}

  public async findMainDatasbyIdUser(idUser: number) {
    const mainDatas = new MainDatasDto();

    //1. first the categories data
    mainDatas.setupList = await this.setupService.findAll();
    mainDatas.failureList = await this.failureService.findAllFailure();

    //2 then the global orders data
    mainDatas.globalOrderList = await this.findAndFillGlobalOrders(idUser);

    return mainDatas;
  }

  public async findAndFillGlobalOrders(idUser: number) {
    let globalOrderList = new Array<GlobalOrderFillWithDatasDto>();

    //1. first the list of global orders
    const listGlobalOrders: Array<GlobalOrderDto> =
      await this.globalOrderService.findAllByIdUser(idUser);

    //2. then i fill each global order with its datas
    for (const globalOrder of listGlobalOrders) {
      let globalOrderFillWithData: GlobalOrderFillWithDatasDto =
        new GlobalOrderFillWithDatasDto();
      //2.1. fill the global order with its datas
      globalOrderFillWithData.globalOrder = globalOrder;
      //2.2. fill the setup_go
      globalOrderFillWithData.setupGo =
        await this.setupGoService.findAllByGlobalOrderId(globalOrder.go_id);
      //2.3. fill the image_go
      globalOrderFillWithData.imageGo =
        await this.imageGoService.findAllByGlobalOrderId(globalOrder.go_id);
      //2.4. fill the failure_go
      globalOrderFillWithData.failureGo =
        await this.failureGoService.findAllByGlobalOrderId(globalOrder.go_id);
      //2.5. get the list sub orders and fill them
      globalOrderFillWithData.subOrderList = await this.findAndFillSubOrders(
        globalOrder.go_id,
      );

      //2.6. add the global order to the list
      globalOrderList.push(globalOrderFillWithData);
    }

    //3. return the list of global orders
    return globalOrderList;
  }

  public async findAndFillSubOrders(globalOrderId: number) {
    let subOrderList = new Array<SubOrderFillWithDatasDto>();

    //1. first the list of sub orders
    const listSubOrders: Array<SubOrderDto> =
      await this.subOrderService.findAllByGlobalOrderId(globalOrderId);

    //2. then i fill each sub order with its datas
    for (const subOrder of listSubOrders) {
      let subOrderFillWithData: SubOrderFillWithDatasDto =
        new SubOrderFillWithDatasDto();
      //2.1. fill the sub order with its datas
      subOrderFillWithData.subOrder = subOrder;
      //2.2. fill the setup_so
      subOrderFillWithData.setupSo =
        await this.setupSoService.findAllBySubOrderId(subOrder.so_id);
      //2.3. fill the image_so
      subOrderFillWithData.imageSo =
        await this.imageSoService.findAllBySubOrderId(subOrder.so_id);
      //2.4. fill the failure_so
      subOrderFillWithData.failureSo =
        await this.failureSoService.findAllBySubOrderId(subOrder.so_id);

      //2.5. add the sub order to the list
      subOrderList.push(subOrderFillWithData);
    }

    return subOrderList;
  }
}
