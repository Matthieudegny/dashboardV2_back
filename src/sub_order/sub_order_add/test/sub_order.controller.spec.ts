import { Test, TestingModule } from '@nestjs/testing';
import { SubOrder_Add_Controller } from '../sub_order_add.controller';
import { SubOrder_Add_Service } from '../sub_order_add.service';
import { Sub_Order_Add_Dto } from '../dto/sub_order_add.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

const subOrderDto = new Sub_Order_Add_Dto();

describe('SubOrderController', () => {
  let controller: SubOrder_Add_Controller;
  let service: SubOrder_Add_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubOrder_Add_Controller],
      providers: [
        {
          provide: SubOrder_Add_Service,
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

    controller = module.get<SubOrder_Add_Controller>(SubOrder_Add_Controller);
    service = module.get<SubOrder_Add_Service>(SubOrder_Add_Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a sub order', async () => {
    const expectedResult: Sub_Order_Add_Dto = new Sub_Order_Add_Dto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.createSubOrderAdd(subOrderDto)).toBe(
      expectedResult,
    );
  });

  it('should find all sub orders', async () => {
    const expectedResult: Sub_Order_Add_Dto[] = [new Sub_Order_Add_Dto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAllSubOrderAdd()).toBe(expectedResult);
  });

  it('should find one sub order', async () => {
    const expectedResult: Sub_Order_Add_Dto = new Sub_Order_Add_Dto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOneSubOrderAdd(id)).toBe(expectedResult);
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

    expect(await controller.updateSubOrderAdd(id, subOrderDto)).toBe(
      expectedResult,
    );
    expect(service.updateSubOrderAdd).toHaveBeenCalledWith(+id, subOrderDto);
  });

  it('should remove a sub order', async () => {
    const expectedResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

    expect(await controller.removeSubOrderAdd(id)).toBe(expectedResult);
    expect(service.removeSubOrderAddById).toHaveBeenCalledWith(+id);
  });
});
