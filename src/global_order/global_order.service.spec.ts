import { Test, TestingModule } from '@nestjs/testing';
import { GlobalOrderService } from './global_order.service';

describe('GlobalOrderService', () => {
  let service: GlobalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalOrderService],
    }).compile();

    service = module.get<GlobalOrderService>(GlobalOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
