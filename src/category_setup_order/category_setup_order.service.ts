import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorySetupOrderDto } from './dto/category_setup_order';
import { Category_Setup_Order } from '../entities/Setup/Category_Setup_Order';

@Injectable()
export class CategorySetupOrderService {
  constructor(
    @InjectRepository(Category_Setup_Order)
    private categorySetupOrderRepository: Repository<Category_Setup_Order>,
  ) {}
  create(createCategorySetupOrderDto: CategorySetupOrderDto) {
    const newCategory = this.categorySetupOrderRepository.create(
      createCategorySetupOrderDto,
    );
    return this.categorySetupOrderRepository.save(newCategory);
  }

  findAll() {
    return this.categorySetupOrderRepository.find();
  }

  findAllByIdUser(idUser: number) {
    return this.categorySetupOrderRepository.find({
      where: { category_setup_order_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.categorySetupOrderRepository.findOne({
      where: { category_setup_order_id: id },
    });
  }

  update(id: number, updateCategorySetupOrderDto: CategorySetupOrderDto) {
    return this.categorySetupOrderRepository.update(
      id,
      updateCategorySetupOrderDto,
    );
  }

  remove(id: number) {
    return this.categorySetupOrderRepository.delete(id);
  }
}
