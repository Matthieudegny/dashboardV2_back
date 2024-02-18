import { Test, TestingModule } from '@nestjs/testing';
import { FailureController } from '../failure.controller';
import { FailureService } from '../failure.service';
import { FailureDto } from '../dtos/failure.dto';

describe('FailureController', () => {
  let failureController: FailureController;
  let failureService: FailureService;

  const mockFailureService = {
    createFailure: jest.fn(),
    findAllFailure: jest.fn(),
    updateFailure: jest.fn(),
    deleteFailure: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FailureController],
      providers: [{ provide: FailureService, useValue: mockFailureService }],
    }).compile();

    failureController = app.get<FailureController>(FailureController);
    failureService = app.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(failureController).toBeDefined();
  });

  it('should create a failure', async () => {
    const createFailureDto: FailureDto = {
      failure_id: 1,
      failure_title: 'failureTitle',
      failure_description: 'failureDescription',
    };
    await failureController.createFailure(createFailureDto);
    expect(failureService.createFailure).toHaveBeenCalledWith(createFailureDto);
  });

  it('should find all failures', async () => {
    await failureController.getFailure();
    expect(failureService.findAllFailure).toHaveBeenCalled();
  });

  it('should update a failure', async () => {
    const id = 1;
    const updateFailureDto: FailureDto = {
      failure_id: 1,
      failure_title: 'failureTitle',
      failure_description: 'failureDescription',
    };
    await failureController.updateFailure(id, updateFailureDto);
    expect(failureService.updateFailure).toHaveBeenCalledWith(
      id,
      updateFailureDto,
    );
  });

  it('should delete a failure', async () => {
    const id = 1;
    await failureController.deleteFailure(id);
    expect(failureService.deleteFailure).toHaveBeenCalledWith(id);
  });
});
