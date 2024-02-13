import { Test, TestingModule } from '@nestjs/testing';
import { ImageGoController } from './image_go.controller';
import { ImageGoService } from './image_go.service';

describe('ImageGoController', () => {
  let controller: ImageGoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageGoController],
      providers: [ImageGoService],
    }).compile();

    controller = module.get<ImageGoController>(ImageGoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
