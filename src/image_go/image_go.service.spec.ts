import { Test, TestingModule } from '@nestjs/testing';
import { ImageGoService } from './image_go.service';

describe('ImageGoService', () => {
  let service: ImageGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageGoService],
    }).compile();

    service = module.get<ImageGoService>(ImageGoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
