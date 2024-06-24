import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Order } from '../entities/Order';

//others dto used
import { GlobalOrderDto } from '../main-datas/dto/main-datas.dto';

//services used
import { SoService } from 'src/so/so.service';
import { ImageOrderService } from '../imageOrder/imageOrder.service';
import { Fg_GoService } from 'src/fg_go/fg_Go.service';
import { SubOrderService } from '../sub_order/sub_order.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private sgGoService: SoService,
    private imageGoService: ImageOrderService,
    private fg_GoService: Fg_GoService,
    // private subOrderService: SubOrderService,
    @Inject(forwardRef(() => SubOrderService))
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

  findAll() {
    return this.orderRepository.find();
  }

  async findAllByIdUser(idUser: number) {
    const result = await this.orderRepository.find({
      where: { order_user_id: idUser },
    });
    return result;
  }

  findOneOrderById(id: number) {
    return this.orderRepository.findOneBy({ order_id: id });
  }

  async update(id: number, updateOrderDto: OrderDto): Promise<OrderDto> {
    try {
      const orderIsUpdated = await this.orderRepository.update(
        id,
        updateOrderDto,
      );

      if (orderIsUpdated.affected === 0)
        throw new Error('Failed to update global order.');

      const OrderUpdated = await this.findOneOrderById(id);
      if (!OrderUpdated) throw new Error('Failed to update global order.');
      return OrderUpdated;
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
    let orderList = new Array<GlobalOrderDto>();

    //1. first the list of global orders
    const listOrders: Array<OrderDto> = await this.findAllByIdUser(idUser);
    //sort the list of global orders by date
    listOrders.sort((a, b) => {
      return a.order_openDate < b.order_openDate ? 1 : -1;
    });

    //2. then i fill each global order with its datas
    for (const globalOrder of listOrders) {
      //2.0. create the object to fill
      let globalOrderFillWithData: GlobalOrderDto = new GlobalOrderDto();
      //2.1. fill the global order with its datas
      globalOrderFillWithData.order = globalOrder;
      //2.2. fill the setup used
      globalOrderFillWithData.setupOrderList =
        await this.sgGoService.findAllSetupByOrderId(globalOrder.order_id);
      //2.3. fill the image_go
      globalOrderFillWithData.imageOrderList =
        await this.imageGoService.findAllByOrderId(globalOrder.order_id);
      //2.4. fill the failure used
      globalOrderFillWithData.failureOrderList =
        await this.fg_GoService.findAllByGlobalOrderId(globalOrder.order_id);
      //2.5. get the list sub orders and fill them
      globalOrderFillWithData.globalSubOrderList =
        await this.subOrderService.findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
          globalOrder.order_id,
        );

      //2.6. add the global order to the list
      orderList.push(globalOrderFillWithData);
    }

    //3. return the list of global orders
    return orderList;
  }

  async updateResultOrder(idOrder: number): Promise<OrderDto> {
    try {
      //get the list of sub orders
      const listSubOrder =
        await this.subOrderService.findAllByGlobalOrderId(idOrder);

      if (listSubOrder.length > 0) {
        //calculate the result of the global order
        let result = 0;
        let assetSold = 0;
        for (const subOrder of listSubOrder) {
          result += subOrder.subOrder_result;
          assetSold += subOrder.subOrder_quantityAsset_sold;
        }

        //update the result of the global order
        const orderToUpdate = await this.findOneOrderById(idOrder);
        orderToUpdate.order_result = result;

        if (assetSold === orderToUpdate.order_quantity)
          orderToUpdate.order_status = false;
        const orderResultIsUpdated = await this.orderRepository.update(
          idOrder,
          orderToUpdate,
        );

        if (orderResultIsUpdated.affected > 0) {
          return orderToUpdate;
        } else {
          throw new Error('Failed to update the result of the global order');
        }
      }
      throw new Error('Failed to update the result of the global order');
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update the result of the global order');
    }
  }
}
