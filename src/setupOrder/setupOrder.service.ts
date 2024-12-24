import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setup_Order } from '../entities/Setup/SetupOrder';
import { SetupOrderDto } from './dto/setup_go.dto';
import { Category_Setup_Order } from 'src/entities/Setup/Category_Setup_Order';

@Injectable()
export class SetupOrderService {
  constructor(
    @InjectRepository(Setup_Order)
    private setupOrderRepository: Repository<Setup_Order>,
    @InjectRepository(Category_Setup_Order)
    private categorySetupOrderRepository: Repository<Category_Setup_Order>,
  ) {}
  create(createSetupDto: SetupOrderDto) {
    try {
      const newSetup = this.setupOrderRepository.create(createSetupDto);
      return this.setupOrderRepository.save(newSetup);
    } catch (error) {
      console.log(error);
    }
  }

  findAllSetupGoByIdUser(idUser: number) {
    try {
      return this.setupOrderRepository.find({
        where: { setup_Order_idUser: idUser },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.setupOrderRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.setupOrderRepository.findOneBy({ setup_Order_id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateSetupDto: Partial<SetupOrderDto>) {
    try {
      // Find the existing setup order
      const existingSetupOrder = await this.setupOrderRepository.findOne({
        where: { setup_Order_id: id },
      });
      if (!existingSetupOrder) {
        throw new Error('Setup order not found');
      }

      // Validate the category setup ID if it's being updated
      // guard protection if the category setup id is not valid
      if (
        updateSetupDto.setup_Order_CategorySetupId !== undefined &&
        updateSetupDto.setup_Order_CategorySetupId !== 0
      ) {
        const categoryExists = await this.categorySetupOrderRepository.findOne({
          where: {
            category_setup_order_id: updateSetupDto.setup_Order_CategorySetupId,
          },
        });
        if (!categoryExists) {
          throw new Error('Invalid category setup ID');
        }
      }

      // Update only the properties that are provided in the DTO
      // the setup_Order_CategorySetupId is optional so we need to set it to null if it is not provided
      Object.assign(existingSetupOrder, {
        ...updateSetupDto,
        setup_Order_CategorySetupId:
          updateSetupDto.setup_Order_CategorySetupId || null,
      });

      // Save the updated setup order
      return this.setupOrderRepository.save(existingSetupOrder);
    } catch (error) {
      console.log(error);
    }
  }
  remove(id: number) {
    try {
      return this.setupOrderRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
