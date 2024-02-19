import { Test, TestingModule } from '@nestjs/testing';
import { ImageGoController } from '../image_go.controller';
import { ImageGoService } from '../image_go.service';
import { ImageGoDto } from '../dto/image_go.dto';

const imageGoDto: ImageGoDto = new ImageGoDto();

describe('ImageGoController', () => {
  let controller: ImageGoController;
  let service: ImageGoService;

  const mockImageGoService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageGoController],
      providers: [{ provide: ImageGoService, useValue: mockImageGoService }],
    }).compile();

    controller = module.get<ImageGoController>(ImageGoController);
    service = module.get<ImageGoService>(ImageGoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an image go', async () => {
    await controller.create(imageGoDto);
    expect(service.create).toHaveBeenCalledWith(imageGoDto);
  });

  it('should find all image gos', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one image go by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an image go', async () => {
    const id = '1';
    await controller.update(id, imageGoDto);
    expect(service.update).toHaveBeenCalledWith(+id, imageGoDto);
  });

  it('should remove an image go', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
