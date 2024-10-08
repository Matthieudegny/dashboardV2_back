import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Order } from '../entities/Order';

//others dto used
import { GlobalOrderDto } from '../main-datas/dto/main-datas.dto';

//services used
import { S_o_Service } from 'src/s_o/s_o.service';
import { ImageOrderService } from '../imageOrder/imageOrder.service';
import { Fg_GoService } from 'src/fg_go/fg_Go.service';
import { SubOrder_Add_Service } from '../sub_order/sub_order_add/suborder_Add.service';
import { SubOrder_Reduce_Service } from '../sub_order/sub_order_reduce/suborder_Reduce.service';
import { Global_SubOrder_Service } from 'src/globalSubOrder/global_sub_order.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private sgGoService: S_o_Service,
    private imageGoService: ImageOrderService,
    private fg_GoService: Fg_GoService,
    // private subOrderService: SubOrderService,
    @Inject(forwardRef(() => SubOrder_Add_Service))
    private subOrderService: SubOrder_Add_Service,
    @Inject(forwardRef(() => SubOrder_Reduce_Service))
    private subOrderReduceService: SubOrder_Reduce_Service,
    private globalSubOrderService: Global_SubOrder_Service,
  ) {}

  async create(createOrderDto: OrderDto) {
    try {
      const newGlobalOrder = this.orderRepository.create(createOrderDto);
      const result = await this.orderRepository.save(newGlobalOrder);
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
    for (const order of listOrders) {
      //2.0. create the object to fill
      let globalOrderFillWithData: GlobalOrderDto = new GlobalOrderDto();
      //2.1. fill the global order with its datas
      globalOrderFillWithData.order = order;
      //2.2. fill the setup used
      globalOrderFillWithData.setupOrderList =
        await this.sgGoService.findAllSetupByOrderId(order.order_id);
      //2.3. fill the image_go
      globalOrderFillWithData.imageOrderList =
        await this.imageGoService.findAllByOrderId(order.order_id);
      //2.4. fill the failure used
      globalOrderFillWithData.failureOrderList =
        await this.fg_GoService.findAllByGlobalOrderId(order.order_id);
      //2.5. get the list sub orders and fill them
      globalOrderFillWithData.globalSubOrderList =
        await this.globalSubOrderService.findAllGlobalSubOrderByIdOrder(
          order.order_id,
        );

      //2.6. add the global order to the list
      orderList.push(globalOrderFillWithData);
    }

    //3. return the list of global orders
    return orderList;
  }

  // after some changes in the sub order list, we need to update the global order
  // method usualy called after a sub order is created, updated or deleted
  async updateOrder(idOrder: number): Promise<OrderDto> {
    try {
      //get the list of sub orders
      const listSubOrder =
        await this.subOrderService.findAllSubOrderAddByOrderId(idOrder);

      //get the order
      const orderToUpdate = await this.findOneOrderById(idOrder);
      if (!orderToUpdate)
        throw new Error('Failed to update the result of the global order');

      // i got some sub orders
      if (listSubOrder.length > 0) {
        //calculate the result of the global order
        // check if the order is closed or not (remind close  === status false)
        let result = 0;
        let assetSold = 0;
        // for (const subOrder of listSubOrder) {
        //   result += subOrder.subOrder_result;
        //   assetSold += subOrder.subOrder_quantityAsset_sold;
        // }

        // update the result of the global order
        orderToUpdate.order_result = result;

        // check if the order is closed or not (remind close  === status false)
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
      // no sub orders so result is directly set to 0, and status to true
      else {
        orderToUpdate.order_result = 0;
        orderToUpdate.order_status = true;
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
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update the result of the global order');
    }
  }
}
