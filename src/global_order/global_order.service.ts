import { Injectable } from '@nestjs/common';
import { GlobalOrderDto } from './dto/global_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global_Order } from '../entities/Global_Order';

//others dto used
import { GlobalOrderFillWithDatasDto } from '../main-datas/dto/main-datas.dto';

//services used
import { SetupGoService } from '../setup_go/setup_go.service';
import { ImageGoService } from '../image_go/image_go.service';
import { FailureGoService } from '../failure_go/failure_go.service';
import { SubOrderService } from '../sub_order/sub_order.service';

@Injectable()
export class GlobalOrderService {
  constructor(
    @InjectRepository(Global_Order)
    private globalOrderRepository: Repository<Global_Order>,
    private readonly setupGoService: SetupGoService,
    private readonly imageGoService: ImageGoService,
    private readonly failureGoService: FailureGoService,
    private readonly subOrderService: SubOrderService,
  ) {}
  create(createGlobalOrderDto: GlobalOrderDto) {
    const newGlobalOrder =
      this.globalOrderRepository.create(createGlobalOrderDto);
    return this.globalOrderRepository.save(newGlobalOrder);
  }

  findAll() {
    return this.globalOrderRepository.find();
  }

  findAllByIdUser(globalOrderId: number) {
    return this.globalOrderRepository.find({
      where: { go_id: globalOrderId },
    });
  }

  findOne(id: number) {
    return this.globalOrderRepository.findOneBy({ go_id: id });
  }

  update(id: number, updateGlobalOrderDto: GlobalOrderDto) {
    return this.globalOrderRepository.update(id, updateGlobalOrderDto);
  }

  remove(id: number) {
    return this.globalOrderRepository.delete(id);
  }

  async findAllGlobalOrdersByIdUserFilledWithData(idUser: number) {
    let globalOrderList = new Array<GlobalOrderFillWithDatasDto>();

    //1. first the list of global orders
    const listGlobalOrders: Array<GlobalOrderDto> =
      await this.findAllByIdUser(idUser);

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
        await this.failureGoService.findAllFailureCategoriesByGlobalOrderId(
          globalOrder.go_id,
        );
      //2.5. get the list sub orders and fill them
      globalOrderFillWithData.subOrderList =
        await this.subOrderService.findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
          globalOrder.go_id,
        );

      //2.6. add the global order to the list
      globalOrderList.push(globalOrderFillWithData);
    }

    //3. return the list of global orders
    return globalOrderList;
  }
}
