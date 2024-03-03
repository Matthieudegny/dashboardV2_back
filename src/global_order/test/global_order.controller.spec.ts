import { Test, TestingModule } from '@nestjs/testing';
import { GlobalOrderController } from '../global_order.controller';
import { GlobalOrderService } from '../global_order.service';
import { GlobalOrderDto } from '../dto/global_order.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const globalOrderDto = new GlobalOrderDto();

describe('GlobalOrderController', () => {
  let controller: GlobalOrderController;
  let service: GlobalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalOrderController],
      providers: [
        {
          provide: GlobalOrderService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GlobalOrderController>(GlobalOrderController);
    service = module.get<GlobalOrderService>(GlobalOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a global order', async () => {
    const expectedResult: GlobalOrderDto = new GlobalOrderDto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(globalOrderDto)).toBe(expectedResult);
  });

  it('should find all global orders', async () => {
    const expectedResult: GlobalOrderDto[] = [new GlobalOrderDto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one global order', async () => {
    const expectedResult: GlobalOrderDto = new GlobalOrderDto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a global order', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, globalOrderDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, globalOrderDto);
  });

  it('should remove a global order', async () => {
    const expectedResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

    expect(await controller.remove(id)).toBe(expectedResult);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
