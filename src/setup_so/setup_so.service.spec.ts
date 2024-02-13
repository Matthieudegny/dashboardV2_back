import { Test, TestingModule } from '@nestjs/testing';
import { SetupSoService } from './setup_so.service';

describe('SetupSoService', () => {
  let service: SetupSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupSoService],
    }).compile();

    service = module.get<SetupSoService>(SetupSoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
