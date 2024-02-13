import { Test, TestingModule } from '@nestjs/testing';
import { FailureService } from './failure.service';

describe('FailureService', () => {
  let service: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailureService],
    }).compile();

    service = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
