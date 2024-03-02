import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoController } from '../failure_go.controller';
import { FailureGoService } from '../failure_go.service';
import { Failure_GoDto } from '../dto/failure_go.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const failureDto = new Failure_GoDto();
describe('FailureGoController', () => {
  let controller: FailureGoController;
  let service: FailureGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureGoController],
      providers: [
        {
          provide: FailureGoService,
          useValue: {
            createFailure_go: jest.fn(),
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

  it('should create a failure_go', async () => {
    const expectedResult: Failure_GoDto = new Failure_GoDto();
    jest.spyOn(service, 'createFailure_go').mockResolvedValue(expectedResult);

    expect(await controller.create(failureDto)).toBe(expectedResult);
  });
});
