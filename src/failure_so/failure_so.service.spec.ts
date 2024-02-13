import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoService } from './failure_so.service';

describe('FailureSoService', () => {
  let service: FailureSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailureSoService],
    }).compile();

    service = module.get<FailureSoService>(FailureSoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
