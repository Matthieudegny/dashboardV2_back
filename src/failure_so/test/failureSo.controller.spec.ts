import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoController } from '../failure_so.controller';
import { FailureSoService } from '../failure_so.service';
import { FailureSoDto } from '../dtos/failureSo.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('FailureController', () => {
  let controller: FailureSoController;
  let service: FailureSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureSoController],
      providers: [
        {
          provide: FailureSoService,
          useValue: {
            findAllFailure: jest.fn(),
            createFailure: jest.fn(),
            updateFailure: jest.fn(),
            deleteFailure: jest.fn(),
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

  it('should get all failures', async () => {
    const failures: FailureSoDto[] = [
      /* mock your failure data */
    ];
    jest.spyOn(service, 'findAllFailure').mockResolvedValue(failures);

    expect(await controller.getFailure()).toBe(failures);
  });

  it('should create a failure', async () => {
    const failureDto: FailureSoDto = new FailureSoDto();
    const expectedResult: FailureSoDto = new FailureSoDto();

    jest.spyOn(service, 'createFailure').mockResolvedValue(expectedResult);

    expect(await controller.createFailure(failureDto)).toBe(expectedResult);
  });

  it('should update a failure', async () => {
    const id = 1;
    const failureDto: FailureSoDto = new FailureSoDto();
    const updateResult: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };

    jest.spyOn(service, 'updateFailure').mockResolvedValue(updateResult);

    expect(await controller.updateFailure(id, failureDto)).toBe(updateResult);
  });

  it('should delete a failure', async () => {
    const id = 1;
    const updateResult: DeleteResult = { raw: [], affected: 1 };

    jest.spyOn(service, 'deleteFailure').mockResolvedValue(updateResult);

    expect(await controller.deleteFailure(id)).toBe(updateResult);
  });
});
