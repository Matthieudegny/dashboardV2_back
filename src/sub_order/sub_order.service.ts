import { Injectable } from '@nestjs/common';
import { SubOrderDto } from './dto/sub_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sub_Order } from '../entities/Sub_Order';
//other dtos used
import { SubOrderFillWithDatasDto } from '../main-datas/dto/main-datas.dto';

//services used
import { SetupSoService } from '../setup_so/setup_so.service';
import { ImageSoService } from '../image_so/image_so.service';
import { Fs_So_Service } from '../fs_so/fs_So.service';

@Injectable()
export class SubOrderService {
  constructor(
    @InjectRepository(Sub_Order)
    private subOrderRepository: Repository<Sub_Order>,
    private readonly setupSoService: SetupSoService,
    private readonly imageSoService: ImageSoService,
    private readonly failureSoService: Fs_So_Service,
  ) {}
  create(createSubOrderDto: SubOrderDto) {
    const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
    return this.subOrderRepository.save(newSubOrder);
  }

  findAll() {
    return this.subOrderRepository.find();
  }

  findAllByGlobalOrderId(globalOrderId: number) {
    return this.subOrderRepository.find({
      where: { so_go_id: globalOrderId },
    });
  }

  findOne(id: number) {
    return this.subOrderRepository.findOneBy({ so_id: id });
  }

  update(id: number, updateSubOrderDto: SubOrderDto) {
    return this.subOrderRepository.update(id, updateSubOrderDto);
  }

  remove(id: number) {
    return this.subOrderRepository.delete(id);
  }

  async findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
    globalOrderId: number,
  ) {
    let subOrderList = new Array<SubOrderFillWithDatasDto>();

    //1. first the list of sub orders
    const listSubOrders: Array<SubOrderDto> =
      await this.findAllByGlobalOrderId(globalOrderId);

    //2. then i fill each sub order with its datas
    for (const subOrder of listSubOrders) {
      let subOrderFillWithData: SubOrderFillWithDatasDto =
        new SubOrderFillWithDatasDto();
      //2.1. fill the sub order with its datas
      subOrderFillWithData.subOrder = subOrder;
      //2.2. fill the setup_so used
      subOrderFillWithData.setupSo =
        await this.setupSoService.findAllBySubOrderId(subOrder.so_id);
      //2.3. fill the image_so
      subOrderFillWithData.imageSo =
        await this.imageSoService.findAllBySubOrderId(subOrder.so_id);
      //2.4. fill the failure_so used
      subOrderFillWithData.failureSo =
        await this.failureSoService.findAllBySubOrderId(subOrder.so_id);

      //2.5. add the sub order to the list
      subOrderList.push(subOrderFillWithData);
    }

    return subOrderList;
  }
}
