import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ImageSoService } from '../image_so.service';
import { ImageSoDto } from '../dto/image_so.dto';
import { Image_So } from '../../entities/image/Image_so';

describe('ImageSoService', () => {
  let imageSoService: ImageSoService;
  let imageSoRepository: Repository<Image_So>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageSoService,
        {
          provide: getRepositoryToken(Image_So),
          useClass: Repository,
        },
      ],
    }).compile();

    imageSoService = module.get<ImageSoService>(ImageSoService);
    imageSoRepository = module.get<Repository<Image_So>>(
      getRepositoryToken(Image_So),
    );
  });

  it('should be defined', () => {
    expect(imageSoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new imageSo', async () => {
      const mockImageSoDto = new ImageSoDto();
      const mockCreatedImageSo = new Image_So();
      jest
        .spyOn(imageSoRepository, 'create')
        .mockReturnValueOnce(mockCreatedImageSo);
      jest
        .spyOn(imageSoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedImageSo);

      const result = await imageSoService.create(mockImageSoDto);
      expect(result).toEqual(mockCreatedImageSo);
    });
  });

  describe('findAll', () => {
    it('should return an array of imageSo', async () => {
      const mockImageSos: Image_So[] = [new Image_So()];
      jest.spyOn(imageSoRepository, 'find').mockResolvedValueOnce(mockImageSos);

      const result = await imageSoService.findAll();
      expect(result).toEqual(mockImageSos);
    });
  });

  describe('findAllBySubOrderId', () => {
    it('should return an array of imageSo by subOrderId', async () => {
      const subOrderId = 1;
      const mockImageSos: Image_So[] = [new Image_So()];
      jest.spyOn(imageSoRepository, 'find').mockResolvedValueOnce(mockImageSos);

      const result = await imageSoService.findAllBySubOrderId(subOrderId);
      expect(result).toEqual(mockImageSos);
    });
  });

  describe('findOne', () => {
    it('should return a single imageSo', async () => {
      const mockImageSo = new Image_So();
      jest
        .spyOn(imageSoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockImageSo);

      const result = await imageSoService.findOne(1);
      expect(result).toEqual(mockImageSo);
    });
  });

  describe('update', () => {
    it('should update an existing imageSo', async () => {
      const mockImageSoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(imageSoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await imageSoService.update(
        mockImageSoId,
        new ImageSoDto(),
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing imageSo', async () => {
      const mockImageSoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(imageSoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await imageSoService.remove(mockImageSoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
