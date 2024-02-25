import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageSoService } from '../image_so.service';
import { ImageSoDto } from '../dto/image_so.dto';
import { Image_So } from '../../entities/image/Image_so';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageSoDto = new ImageSoDto(); // Définition en haut du fichier
const imageSo = new Image_So(); // Instance de l'entité

describe('ImageSoService', () => {
  let service: ImageSoService;
  let repo: Repository<Image_So>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageSoService,
        {
          provide: getRepositoryToken(Image_So),
          useValue: {
            create: jest.fn().mockReturnValue(imageSo),
            save: jest.fn().mockResolvedValue(imageSo),
            find: jest.fn().mockResolvedValue([imageSo]),
            findOneBy: jest.fn().mockResolvedValue(imageSo),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<ImageSoService>(ImageSoService);
    repo = module.get<Repository<Image_So>>(getRepositoryToken(Image_So));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an image so', async () => {
    expect(await service.create(imageSoDto)).toEqual(imageSo);
    expect(repo.create).toHaveBeenCalledWith(imageSoDto);
    expect(repo.save).toHaveBeenCalledWith(imageSo);
  });

  it('should find all image sos', async () => {
    expect(await service.findAll()).toEqual([imageSo]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one image so by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(imageSo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ image_so_id: id });
  });

  it('should update an image so', async () => {
    const id = 1;
    const result = new UpdateResult();
    expect(await service.update(id, imageSoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, imageSoDto);
  });

  it('should remove an image so', async () => {
    const id = 1;
    const result = new DeleteResult();
    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });

  it('should find all image sos by sub order id', async () => {
    const subOrderId = 123;
    const imageSos: Image_So[] = [
      new Image_So(),
      new Image_So(),
      new Image_So(),
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(imageSos);

    expect(await service.findAllBySubOrderId(subOrderId)).toEqual(imageSos);
    expect(repo.find).toHaveBeenCalledWith({
      where: { image_so_id: subOrderId },
    });
  });
});
