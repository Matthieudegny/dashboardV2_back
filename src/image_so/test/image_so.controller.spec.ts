import { Test, TestingModule } from '@nestjs/testing';
import { ImageSoController } from '../image_so.controller';
import { ImageSoService } from '../image_so.service';
import { ImageSoDto } from '../dto/image_so.dto';
import { Image_So } from '../../entities/image/Image_so';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageSoDto = new ImageSoDto();

describe('ImageSoController', () => {
  let controller: ImageSoController;
  let service: ImageSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageSoController],
      providers: [
        {
          provide: ImageSoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImageSoController>(ImageSoController);
    service = module.get<ImageSoService>(ImageSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an imageSo', async () => {
    const expectedResult: Image_So = new Image_So();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(imageSoDto)).toBe(expectedResult);
  });

  it('should find all imageSo', async () => {
    const expectedResult: Image_So[] = [new Image_So()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one imageSo', async () => {
    const expectedResult: Image_So = new Image_So();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an imageSo', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, imageSoDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, imageSoDto);
  });

  it('should remove an imageSo', async () => {
    const expectedResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

    expect(await controller.remove(id)).toBe(expectedResult);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
