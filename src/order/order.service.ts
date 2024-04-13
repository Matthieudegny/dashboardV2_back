import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Order } from '../entities/Order';

//others dto used
import { GlobalOrderFillWithDatasDto } from '../main-datas/dto/main-datas.dto';

//services used
import { SoService } from 'src/so/so.service';
import { ImageGoService } from '../image_go/image_go.service';
import { Fg_GoService } from 'src/fg_go/fg_Go.service';
import { SubOrderService } from '../sub_order/sub_order.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private sgGoService: SoService,
    private imageGoService: ImageGoService,
    private fg_GoService: Fg_GoService,
    private subOrderService: SubOrderService,
  ) {}
  async create(createOrderDto: OrderDto) {
    try {
      const newGlobalOrder = this.orderRepository.create(createOrderDto);
      const result = await this.orderRepository.save(newGlobalOrder);
      console.log('result', result);
      return result;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create global order.');
    }
  }

  // async createGlobalOrderWithDatas(
  //   createGlobalOrderWithDatasDto: GlobalOrderFillWithDatasDto,
  // ) {
  //   //1. create the global order and take the id
  //   const newGlobaOrder = await this.create(
  //     createGlobalOrderWithDatasDto.globalOrder,
  //   );

  //   if (!newGlobaOrder) {
  //     throw new Error('Failed to create global order.');
  //   }

  //   const newGlobaOrderId = newGlobaOrder.go_id;

  //   //i get the global order id, so now i can create the datas related to this global order = images and setups

  //   //2. create the setupsGo associations between the global order and the setupsGo
  //   await this.sgGoService.create(createGlobalOrderWithDatasDto.setupGo);

  //   //3. create the imagesGo
  //   for (const imageGo of createGlobalOrderWithDatasDto.imageGo) {
  //     await this.imageGoService.create({
  //       image_go_id: 0,
  //       image_go_go_id: newGlobaOrderId,
  //       image_go_title: imageGo.image_go_title,
  //       image_go_content: imageGo.image_go_content,
  //     });
  //   }
  // }

  findAll() {
    return this.orderRepository.find();
  }

  async findAllByIdUser(idUser: number) {
    const result = await this.orderRepository.find({
      where: { go_user_id: idUser },
    });
    return result;
  }

  findOneOrderById(id: number) {
    return this.orderRepository.findOneBy({ go_id: id });
  }

  async update(id: number, updateOrderDto: OrderDto): Promise<OrderDto> {
    try {
      const orderIsUpdated = await this.orderRepository.update(
        id,
        updateOrderDto,
      );
      if (orderIsUpdated.affected > 0) {
        const OrderUpdated = await this.findOneOrderById(id);
        return OrderUpdated;
      } else {
        throw new Error('Failed to update global order.');
      }
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update global order.');
    }
  }

  remove(id: number) {
    try {
      return this.orderRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete global order.${error}`);
    }
  }

  async findAllGlobalOrdersByIdUserFilledWithData(idUser: number) {
    let orderList = new Array<GlobalOrderFillWithDatasDto>();

    //1. first the list of global orders
    const listOrders: Array<OrderDto> = await this.findAllByIdUser(idUser);

    //2. then i fill each global order with its datas
    for (const globalOrder of listOrders) {
      //2.0. create the object to fill
      let globalOrderFillWithData: GlobalOrderFillWithDatasDto =
        new GlobalOrderFillWithDatasDto();
      //2.1. fill the global order with its datas
      globalOrderFillWithData.globalOrder = globalOrder;
      //2.2. fill the setup used
      globalOrderFillWithData.setupGo =
        await this.sgGoService.findAllSetupByOrderId(globalOrder.go_id);
      //2.3. fill the image_go
      globalOrderFillWithData.imageGo =
        await this.imageGoService.findAllByGlobalOrderId(globalOrder.go_id);
      //2.4. fill the failure used
      globalOrderFillWithData.failureGo =
        await this.fg_GoService.findAllByGlobalOrderId(globalOrder.go_id);
      //2.5. get the list sub orders and fill them
      globalOrderFillWithData.globalSubOrderList =
        await this.subOrderService.findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
          globalOrder.go_id,
        );

      //2.6. add the global order to the list
      orderList.push(globalOrderFillWithData);
    }

    //3. return the list of global orders
    return orderList;
  }
}
