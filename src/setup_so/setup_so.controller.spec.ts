import { Test, TestingModule } from '@nestjs/testing';
import { SetupSoController } from './setup_so.controller';
import { SetupSoService } from './setup_so.service';

describe('SetupSoController', () => {
  let controller: SetupSoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupSoController],
      providers: [SetupSoService],
    }).compile();

    controller = module.get<SetupSoController>(SetupSoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
