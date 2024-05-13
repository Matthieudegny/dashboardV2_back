import { Test, TestingModule } from '@nestjs/testing';
import { ImageSubOrderController } from '../imageSubOrder.controller';
import { ImageSubOrderService } from '../imageSubOrder.service';
import { ImageSubOrderDto } from '../dto/image_so.dto';
import { Image_SubOrder } from '../../entities/image/ImageSubOrder';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageSoDto = new ImageSubOrderDto();

describe('ImageSoController', () => {
  let controller: ImageSubOrderController;
  let service: ImageSubOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageSubOrderController],
      providers: [
        {
          provide: ImageSubOrderService,
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

    controller = module.get<ImageSubOrderController>(ImageSubOrderController);
    service = module.get<ImageSubOrderService>(ImageSubOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an imageSo', async () => {
    const expectedResult: Image_SubOrder = new Image_SubOrder();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(imageSoDto)).toBe(expectedResult);
  });

  it('should find all imageSo', async () => {
    const expectedResult: Image_SubOrder[] = [new Image_SubOrder()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one imageSo', async () => {
    const expectedResult: Image_SubOrder = new Image_SubOrder();
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
