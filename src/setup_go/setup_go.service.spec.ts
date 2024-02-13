import { Test, TestingModule } from '@nestjs/testing';
import { SetupGoService } from './setup_go.service';

describe('SetupGoService', () => {
  let service: SetupGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupGoService],
    }).compile();

    service = module.get<SetupGoService>(SetupGoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
