import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
//Services
import { MainDatasService } from './main-datas.service';
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

@ApiTags('MainDatas')
@Controller('main-datas')
export class MainDatasController {
  constructor(
    private readonly mainDatasService: MainDatasService,
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

  @Get()
  findAll() {
    console.log('main-datas.controller.ts:findAll');
  }

  @Get(':idUser')
  async findMainDatasbyIdUser(@Param('idUser') idUser: number) {
    console.log('idUser', idUser);
    const mainDatas = new MainDatasDto();
    //1. first the categories data
    mainDatas.setupList = await this.setupService.findAll();
    mainDatas.failureList = await this.failureService.findAllFailure();
    let globalOrderList = new Array<GlobalOrderFillWithDatasDto>();
    let subOrderList = new Array<SubOrderFillWithDatasDto>();
    //2 then the global orders data
    const listGlobalOrders: Array<GlobalOrderDto> =
      await this.globalOrderService.findAllByIdUser(idUser);

    console.log('listGlobalOrders.length > 0', listGlobalOrders);
    if (listGlobalOrders.length > 0) {
      let listSubOrders: Array<SubOrderDto> = [];

      for (const globalOrder of listGlobalOrders) {
        let globalOrderFillWithData: GlobalOrderFillWithDatasDto =
          new GlobalOrderFillWithDatasDto();
        //2.1 i get the global order data
        globalOrderFillWithData.globalOrder = globalOrder;
        //2.2 then, for setup and failures, i get the setup_go and failure_go data (they are datas from associations tables ), and then the categories setup and failure
        globalOrderFillWithData.setupGo =
          await this.setupGoService.findAllByGlobalOrderId(globalOrder.go_id);
        globalOrderFillWithData.failureGo =
          await this.failureGoService.findAllByGlobalOrderId(globalOrder.go_id);

        //2.3 No association table for image, so i get directly the imageGoData for each global order
        globalOrderFillWithData.imageGo =
          await this.imageGoService.findAllByGlobalOrderId(globalOrder.go_id);

        //3. then for each global order, i get the sub orders corresponding to the global order
        listSubOrders = await this.subOrderService.findAllByGlobalOrderId(
          globalOrder.go_id,
        );
        //4. then for each sub order, i get the setup_so, image_so and failure_so data
        if (listSubOrders.length > 0) {
          let subOrderFillWithData: SubOrderFillWithDatasDto =
            new SubOrderFillWithDatasDto();
          for (const subOrder of listSubOrders) {
            //4.1 i get the sub order data
            subOrderFillWithData.subOrder = subOrder;

            //4.2 then, for setup and failures, i get the setup_so and failure_so data (they are datas from associations tables ), and then the categories setup and failure
            subOrderFillWithData.setupSo =
              await this.setupSoService.findAllBySubOrderId(subOrder.so_id);
            subOrderFillWithData.failureSo =
              await this.failureSoService.findAllBySubOrderId(subOrder.so_id);

            //4.3 No association table for image, so i get directly the imageSoData for each sub order
            subOrderFillWithData.imageSo =
              await this.imageSoService.findAllBySubOrderId(subOrder.so_id);
          }
          subOrderList.push(subOrderFillWithData);
        }
        globalOrderList.push(globalOrderFillWithData);
        globalOrderFillWithData.subOrderList = subOrderList;
      }
    }
    mainDatas.globalOrderList = globalOrderList;
    return mainDatas;
  }
}
