import { Test, TestingModule } from '@nestjs/testing';
import { ImageSoController } from './image_so.controller';
import { ImageSoService } from './image_so.service';

describe('ImageSoController', () => {
  let controller: ImageSoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageSoController],
      providers: [ImageSoService],
    }).compile();

    controller = module.get<ImageSoController>(ImageSoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
