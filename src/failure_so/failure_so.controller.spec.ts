import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoController } from './failure_so.controller';
import { FailureSoService } from './failure_so.service';

describe('FailureSoController', () => {
  let controller: FailureSoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureSoController],
      providers: [FailureSoService],
    }).compile();

    controller = module.get<FailureSoController>(FailureSoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
