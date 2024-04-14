import { Test, TestingModule } from '@nestjs/testing';
import { ImageOrderController } from '../imageOrder.controller';
import { ImageOrderService } from '../imageOrder.service';
import { ImageOrderDto } from '../dto/imageOrder.dto';
import { Image_Go } from '../../entities/image/ImageOrder';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageGoDto = new ImageOrderDto();

describe('ImageGoController', () => {
  let controller: ImageOrderController;
  let service: ImageOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageOrderController],
      providers: [
        {
          provide: ImageOrderService,
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

    controller = module.get<ImageOrderController>(ImageOrderController);
    service = module.get<ImageOrderService>(ImageOrderService);
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
