import { Test, TestingModule } from '@nestjs/testing';
import { Fg_GoController } from '../fg_Go.controller';
import { Fg_GoService } from '../fg_Go.service';
import { Fg_Go_Dto } from '../dto/fg_Go.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const failureDto = new Fg_Go_Dto();
describe('FailureGoController', () => {
  let controller: Fg_GoController;
  let service: Fg_GoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Fg_GoController],
      providers: [
        {
          provide: Fg_GoService,
          useValue: {
            createFailure_go: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<Fg_GoController>(Fg_GoController);
    service = module.get<Fg_GoService>(Fg_GoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a failure_go', async () => {
    const expectedResult: Fg_Go_Dto = new Fg_Go_Dto();
    jest.spyOn(service, 'createFailure_go').mockResolvedValue(expectedResult);

    expect(await controller.create(failureDto)).toBe(expectedResult);
  });

  it('should find all failure_go', async () => {
    const expectedResult: Fg_Go_Dto[] = [new Fg_Go_Dto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one failure_go', async () => {
    const expectedResult: Fg_Go_Dto = new Fg_Go_Dto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a failure_go', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, failureDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, failureDto);
  });

  it('should remove a failure_go', async () => {
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
