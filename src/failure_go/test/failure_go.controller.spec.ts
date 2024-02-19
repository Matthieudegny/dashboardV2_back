import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoController } from '../failure_go.controller';
import { FailureGoService } from '../failure_go.service';
import { Failure_GoDto } from '../dto/failure_go.dto';

const failureGoDto = new Failure_GoDto();

describe('FailureGoController', () => {
  let failureGoController: FailureGoController;
  let failureGoService: FailureGoService;

  const mockFailureGoService = {
    createFailure_go: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FailureGoController],
      providers: [
        { provide: FailureGoService, useValue: mockFailureGoService },
      ],
    }).compile();

    failureGoController = app.get<FailureGoController>(FailureGoController);
    failureGoService = app.get<FailureGoService>(FailureGoService);
  });

  it('should be defined', () => {
    expect(failureGoController).toBeDefined();
  });

  it('should create a failure', async () => {
    await failureGoController.create(failureGoDto);
    expect(failureGoService.createFailure_go).toHaveBeenCalledWith(
      failureGoDto,
    );
  });

  it('should find all failures', async () => {
    await failureGoController.findAll();
    expect(failureGoService.findAll).toHaveBeenCalled();
  });

  it('should find one failure by id', async () => {
    const id = '1';
    await failureGoController.findOne(id);
    expect(failureGoService.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a failure', async () => {
    const id = '1';
    await failureGoController.update(id, failureGoDto);
    expect(failureGoService.update).toHaveBeenCalledWith(+id, failureGoDto);
  });

  it('should remove a failure', async () => {
    const id = '1';
    await failureGoController.remove(id);
    expect(failureGoService.remove).toHaveBeenCalledWith(+id);
  });
});
