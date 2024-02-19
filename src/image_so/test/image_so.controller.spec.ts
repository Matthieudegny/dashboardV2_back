import { Test, TestingModule } from '@nestjs/testing';
import { ImageSoController } from '../image_so.controller';
import { ImageSoService } from '../image_so.service';
import { ImageSoDto } from '../dto/image_so.dto';

const imageSoDto = new ImageSoDto(); // Initialisation de l'objet DTO

describe('ImageSoController', () => {
  let controller: ImageSoController;
  let service: ImageSoService;

  const mockImageSoService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageSoController],
      providers: [{ provide: ImageSoService, useValue: mockImageSoService }],
    }).compile();

    controller = module.get<ImageSoController>(ImageSoController);
    service = module.get<ImageSoService>(ImageSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an image so', async () => {
    await controller.create(imageSoDto);
    expect(service.create).toHaveBeenCalledWith(imageSoDto);
  });

  it('should find all image sos', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one image so by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an image so', async () => {
    const id = '1';
    await controller.update(id, imageSoDto);
    expect(service.update).toHaveBeenCalledWith(+id, imageSoDto);
  });

  it('should remove an image so', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
