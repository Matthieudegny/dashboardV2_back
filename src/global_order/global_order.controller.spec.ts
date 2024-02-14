import { Test, TestingModule } from '@nestjs/testing';
import { GlobalOrderController } from './global_order.controller';
import { GlobalOrderService } from './global_order.service';

describe('GlobalOrderController', () => {
  let controller: GlobalOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalOrderController],
      providers: [GlobalOrderService],
    }).compile();

    controller = module.get<GlobalOrderController>(GlobalOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
