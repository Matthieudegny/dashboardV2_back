import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ImageGoService } from '../image_go.service';
import { ImageGoDto } from '../dto/image_go.dto';
import { Image_Go } from '../../entities/image/Image_go';

describe('ImageGoService', () => {
  let imageGoService: ImageGoService;
  let imageGoRepository: Repository<Image_Go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageGoService,
        {
          provide: getRepositoryToken(Image_Go),
          useClass: Repository,
        },
      ],
    }).compile();

    imageGoService = module.get<ImageGoService>(ImageGoService);
    imageGoRepository = module.get<Repository<Image_Go>>(
      getRepositoryToken(Image_Go),
    );
  });

  it('should be defined', () => {
    expect(imageGoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new imageGo', async () => {
      const mockImageGoDto = new ImageGoDto();
      const mockCreatedImageGo = new Image_Go();
      jest
        .spyOn(imageGoRepository, 'create')
        .mockReturnValueOnce(mockCreatedImageGo);
      jest
        .spyOn(imageGoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedImageGo);

      const result = await imageGoService.create(mockImageGoDto);
      expect(result).toEqual(mockCreatedImageGo);
    });
  });

  describe('findAll', () => {
    it('should return an array of imageGo', async () => {
      const mockImageGos: Image_Go[] = [new Image_Go()];
      jest.spyOn(imageGoRepository, 'find').mockResolvedValueOnce(mockImageGos);

      const result = await imageGoService.findAll();
      expect(result).toEqual(mockImageGos);
    });
  });

  describe('findAllByGlobalOrderId', () => {
    it('should return an array of imageGo by globalOrderId', async () => {
      const globalOrderId = 1;
      const mockImageGos: Image_Go[] = [new Image_Go()];
      jest.spyOn(imageGoRepository, 'find').mockResolvedValueOnce(mockImageGos);

      const result = await imageGoService.findAllByGlobalOrderId(globalOrderId);
      expect(result).toEqual(mockImageGos);
    });
  });

  describe('findOne', () => {
    it('should return a single imageGo', async () => {
      const mockImageGo = new Image_Go();
      jest
        .spyOn(imageGoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockImageGo);

      const result = await imageGoService.findOne(1);
      expect(result).toEqual(mockImageGo);
    });
  });

  describe('update', () => {
    it('should update an existing imageGo', async () => {
      const mockImageGoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(imageGoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await imageGoService.update(
        mockImageGoId,
        new ImageGoDto(),
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing imageGo', async () => {
      const mockImageGoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(imageGoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await imageGoService.remove(mockImageGoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
