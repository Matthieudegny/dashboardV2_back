import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoController } from '../failure_so.controller';
import { FailureSoService } from '../failure_so.service';
import { Failure_SoDto } from '../dto/failure_so.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const failureDto = new Failure_SoDto();

describe('FailureSoController', () => {
  let controller: FailureSoController;
  let service: FailureSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureSoController],
      providers: [
        {
          provide: FailureSoService,
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

    controller = module.get<FailureSoController>(FailureSoController);
    service = module.get<FailureSoService>(FailureSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a failure_so', async () => {
    const expectedResult: Failure_SoDto = new Failure_SoDto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(failureDto)).toBe(expectedResult);
  });

  it('should find all failure_so', async () => {
    const expectedResult: Failure_SoDto[] = [new Failure_SoDto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one failure_so', async () => {
    const expectedResult: Failure_SoDto = new Failure_SoDto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a failure_so', async () => {
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

  it('should remove a failure_so', async () => {
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
