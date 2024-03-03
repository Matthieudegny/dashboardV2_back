import { Test, TestingModule } from '@nestjs/testing';
import { ImageGoController } from '../image_go.controller';
import { ImageGoService } from '../image_go.service';
import { ImageGoDto } from '../dto/image_go.dto';
import { Image_Go } from '../../entities/image/Image_go';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageGoDto = new ImageGoDto();

describe('ImageGoController', () => {
  let controller: ImageGoController;
  let service: ImageGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageGoController],
      providers: [
        {
          provide: ImageGoService,
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

    controller = module.get<ImageGoController>(ImageGoController);
    service = module.get<ImageGoService>(ImageGoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an imageGo', async () => {
    const expectedResult: Image_Go = new Image_Go();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(imageGoDto)).toBe(expectedResult);
  });

  it('should find all imageGo', async () => {
    const expectedResult: Image_Go[] = [new Image_Go()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one imageGo', async () => {
    const expectedResult: Image_Go = new Image_Go();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an imageGo', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, imageGoDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, imageGoDto);
  });

  it('should remove an imageGo', async () => {
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
