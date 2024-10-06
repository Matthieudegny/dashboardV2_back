import { Test, TestingModule } from '@nestjs/testing';
import { SubOrder_Reduce_Controller } from '../suborder_Reduce.controller';
import { SubOrder_Reduce_Service } from '../suborder_Reduce.service';
import { Suborder_Reduce_Dto } from '../dto/suborder_Reduce.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

const subOrderDto = new Suborder_Reduce_Dto();

describe('SubOrderController', () => {
  let controller: SubOrder_Reduce_Controller;
  let service: SubOrder_Reduce_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubOrder_Reduce_Controller],
      providers: [
        {
          provide: SubOrder_Reduce_Service,
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

    controller = module.get<SubOrder_Reduce_Controller>(
      SubOrder_Reduce_Controller,
    );
    service = module.get<SubOrder_Reduce_Service>(SubOrder_Reduce_Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a sub order', async () => {
    const expectedResult: Suborder_Reduce_Dto = new Suborder_Reduce_Dto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.createSubOrderReduce(subOrderDto)).toBe(
      expectedResult,
    );
  });

  it('should find all sub orders', async () => {
    const expectedResult: Suborder_Reduce_Dto[] = [new Suborder_Reduce_Dto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAllSubOrderReduce()).toBe(expectedResult);
  });

  it('should find one sub order', async () => {
    const expectedResult: Suborder_Reduce_Dto = new Suborder_Reduce_Dto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOneSubOrderReduce(id)).toBe(expectedResult);
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

    expect(await controller.updateSubOrderReduce(id, subOrderDto)).toBe(
      expectedResult,
    );
    expect(service.updateSubOrderReduce).toHaveBeenCalledWith(+id, subOrderDto);
  });

  it('should remove a sub order', async () => {
    const expectedResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

    expect(await controller.removeSubOrderReduce(id)).toBe(expectedResult);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
