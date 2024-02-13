import { Test, TestingModule } from '@nestjs/testing';
import { SetupGoController } from './setup_go.controller';
import { SetupGoService } from './setup_go.service';

describe('SetupGoController', () => {
  let controller: SetupGoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupGoController],
      providers: [SetupGoService],
    }).compile();

    controller = module.get<SetupGoController>(SetupGoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
