import { Test, TestingModule } from '@nestjs/testing';
import { GlobalOrderController } from '../global_order.controller';
import { GlobalOrderService } from '../global_order.service';
import { GlobalOrderDto } from '../dto/global_order.dto';

const globalOrderDto = new GlobalOrderDto();

describe('GlobalOrderController', () => {
  let controller: GlobalOrderController;
  let service: GlobalOrderService;

  const mockGlobalOrderService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalOrderController],
      providers: [
        { provide: GlobalOrderService, useValue: mockGlobalOrderService },
      ],
    }).compile();

    controller = module.get<GlobalOrderController>(GlobalOrderController);
    service = module.get<GlobalOrderService>(GlobalOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a global order', async () => {
    await controller.create(globalOrderDto);
    expect(service.create).toHaveBeenCalledWith(globalOrderDto);
  });

  it('should find all global orders', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one global order by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a global order', async () => {
    const id = '1';
    await controller.update(id, globalOrderDto);
    expect(service.update).toHaveBeenCalledWith(+id, globalOrderDto);
  });

  it('should remove a global order', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
