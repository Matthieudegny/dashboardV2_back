import { Test, TestingModule } from '@nestjs/testing';
import { SubOrderController } from '../sub_order.controller';
import { SubOrderService } from '../sub_order.service';
import { SubOrderDto } from '../dto/sub_order.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

const subOrderDto = new SubOrderDto();

describe('SubOrderController', () => {
  let controller: SubOrderController;
  let service: SubOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubOrderController],
      providers: [
        {
          provide: SubOrderService,
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

    controller = module.get<SubOrderController>(SubOrderController);
    service = module.get<SubOrderService>(SubOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a sub order', async () => {
    const expectedResult: SubOrderDto = new SubOrderDto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(subOrderDto)).toBe(expectedResult);
  });

  it('should find all sub orders', async () => {
    const expectedResult: SubOrderDto[] = [new SubOrderDto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one sub order', async () => {
    const expectedResult: SubOrderDto = new SubOrderDto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a sub order', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, subOrderDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, subOrderDto);
  });

  it('should remove a sub order', async () => {
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
