import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoController } from './failure_go.controller';
import { FailureGoService } from './failure_go.service';

describe('FailureGoController', () => {
  let controller: FailureGoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureGoController],
      providers: [FailureGoService],
    }).compile();

    controller = module.get<FailureGoController>(FailureGoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
