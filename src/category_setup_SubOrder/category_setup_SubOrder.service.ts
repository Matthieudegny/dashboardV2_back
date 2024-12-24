import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorySetupSubOrderDto } from './dto/category_setup_SubOrder';
import { Category_Setup_SubOrder } from '../entities/Setup/Category_Setup_SubOrder';

@Injectable()
export class CategorySetupSubOrderService {
  constructor(
    @InjectRepository(Category_Setup_SubOrder)
    private categorySetupSubOrderRepository: Repository<Category_Setup_SubOrder>,
  ) {}
  create(createCategorySetupSubOrderDto: CategorySetupSubOrderDto) {
    const newCategory = this.categorySetupSubOrderRepository.create(
      createCategorySetupSubOrderDto,
    );
    return this.categorySetupSubOrderRepository.save(newCategory);
  }

  findAll() {
    return this.categorySetupSubOrderRepository.find();
  }

  findAllByIdUser(idUser: number) {
    return this.categorySetupSubOrderRepository.find({
      where: { category_setup_subOrder_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.categorySetupSubOrderRepository.findOne({
      where: { category_setup_subOrder_id: id },
    });
  }

  update(id: number, updateCategorySetupSubOrderDto: CategorySetupSubOrderDto) {
    return this.categorySetupSubOrderRepository.update(
      id,
      updateCategorySetupSubOrderDto,
    );
  }

  remove(id: number) {
    return this.categorySetupSubOrderRepository.delete(id);
  }
}
