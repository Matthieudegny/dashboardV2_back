import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoController } from '../failure_go.controller';
import { FailureGoService } from '../failure_go.service';
import { FailureGoDto } from '../dtos/failure_go.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('FailureController', () => {
  let controller: FailureGoController;
  let service: FailureGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureGoController],
      providers: [
        {
          provide: FailureGoService,
          useValue: {
            findAllFailure: jest.fn(),
            createFailure: jest.fn(),
            updateFailure: jest.fn(),
            deleteFailure: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FailureGoController>(FailureGoController);
    service = module.get<FailureGoService>(FailureGoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all failures', async () => {
    const failures: FailureGoDto[] = [
      /* mock your failure data */
    ];
    jest.spyOn(service, 'findAllFailure').mockResolvedValue(failures);

    expect(await controller.getFailure()).toBe(failures);
  });

  it('should create a failure', async () => {
    const failureDto: FailureGoDto = new FailureGoDto();
    const expectedResult: FailureGoDto = new FailureGoDto();

    jest.spyOn(service, 'createFailure').mockResolvedValue(expectedResult);

    expect(await controller.createFailure(failureDto)).toBe(expectedResult);
  });

  it('should update a failure', async () => {
    const id = 1;
    const failureDto: FailureGoDto = new FailureGoDto();
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
