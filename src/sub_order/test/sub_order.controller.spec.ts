import { Test, TestingModule } from '@nestjs/testing';
import { SubOrderController } from '../sub_order.controller';
import { SubOrderService } from '../sub_order.service';
import { SubOrderDto } from '../dto/sub_order.dto';

const subOrderDto = new SubOrderDto(); // Instance of the DTO at the top

describe('SubOrderController', () => {
  let controller: SubOrderController;
  let service: SubOrderService;

  const mockSubOrderService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubOrderController],
      providers: [{ provide: SubOrderService, useValue: mockSubOrderService }],
    }).compile();

    controller = module.get<SubOrderController>(SubOrderController);
    service = module.get<SubOrderService>(SubOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a sub order', async () => {
    await controller.create(subOrderDto);
    expect(service.create).toHaveBeenCalledWith(subOrderDto);
  });

  it('should find all sub orders', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one sub order by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a sub order', async () => {
    const id = '1';
    await controller.update(id, subOrderDto);
    expect(service.update).toHaveBeenCalledWith(+id, subOrderDto);
  });

  it('should remove a sub order', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
