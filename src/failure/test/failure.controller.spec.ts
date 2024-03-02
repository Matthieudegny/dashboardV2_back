import { Test, TestingModule } from '@nestjs/testing';
import { FailureController } from '../failure.controller';
import { FailureService } from '../failure.service';
import { FailureDto } from '../dtos/failure.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('FailureController', () => {
  let controller: FailureController;
  let service: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureController],
      providers: [
        {
          provide: FailureService,
          useValue: {
            findAllFailure: jest.fn(),
            createFailure: jest.fn(),
            updateFailure: jest.fn(),
            deleteFailure: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FailureController>(FailureController);
    service = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all failures', async () => {
    const failures: FailureDto[] = [
      /* mock your failure data */
    ];
    jest.spyOn(service, 'findAllFailure').mockResolvedValue(failures);

    expect(await controller.getFailure()).toBe(failures);
  });

  it('should create a failure', async () => {
    const failureDto: FailureDto = new FailureDto();
    const expectedResult: FailureDto = new FailureDto();

    jest.spyOn(service, 'createFailure').mockResolvedValue(expectedResult);

    expect(await controller.createFailure(failureDto)).toBe(expectedResult);
  });

  it('should update a failure', async () => {
    const id = 1;
    const failureDto: FailureDto = new FailureDto();
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
