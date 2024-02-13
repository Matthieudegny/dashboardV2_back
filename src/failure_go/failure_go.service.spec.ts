import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoService } from './failure_go.service';

describe('FailureGoService', () => {
  let service: FailureGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailureGoService],
    }).compile();

    service = module.get<FailureGoService>(FailureGoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
