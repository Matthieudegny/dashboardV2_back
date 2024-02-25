import { Test, TestingModule } from '@nestjs/testing';
import { MainDatasService } from './main-datas.service';

describe('MainDatasService', () => {
  let service: MainDatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainDatasService],
    }).compile();

    service = module.get<MainDatasService>(MainDatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
