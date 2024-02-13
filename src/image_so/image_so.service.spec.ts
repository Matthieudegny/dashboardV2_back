import { Test, TestingModule } from '@nestjs/testing';
import { ImageSoService } from './image_so.service';

describe('ImageSoService', () => {
  let service: ImageSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageSoService],
    }).compile();

    service = module.get<ImageSoService>(ImageSoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
