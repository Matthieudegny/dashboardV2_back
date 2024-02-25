import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageGoService } from '../image_go.service';
import { ImageGoDto } from '../dto/image_go.dto';
import { Image_Go } from '../../entities/image/Image_go';
import { UpdateResult, DeleteResult } from 'typeorm';

const imageGoDto = new ImageGoDto();
const imageGo = new Image_Go();

describe('ImageGoService', () => {
  let service: ImageGoService;
  let repo: Repository<Image_Go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageGoService,
        {
          provide: getRepositoryToken(Image_Go),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImageGoService>(ImageGoService);
    repo = module.get<Repository<Image_Go>>(getRepositoryToken(Image_Go));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an image go', async () => {
    jest.spyOn(repo, 'create').mockReturnValue(imageGo);
    jest.spyOn(repo, 'save').mockResolvedValue(imageGo);

    expect(await service.create(imageGoDto)).toEqual(imageGo);
    expect(repo.create).toHaveBeenCalledWith(imageGoDto);
    expect(repo.save).toHaveBeenCalledWith(imageGo);
  });

  it('should find all image gos', async () => {
    const imageGos: Image_Go[] = [imageGo, imageGo, imageGo];

    jest.spyOn(repo, 'find').mockResolvedValue(imageGos);

    expect(await service.findAll()).toEqual(imageGos);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one image go by id', async () => {
    const id = 1;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(imageGo);

    expect(await service.findOne(id)).toEqual(imageGo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ image_go_id: id });
  });

  it('should update an image go', async () => {
    const id = 1;
    const result: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };
    jest.spyOn(repo, 'update').mockResolvedValue(result);

    expect(await service.update(id, imageGoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, imageGoDto);
  });

  it('should remove an image go', async () => {
    const id = 1;
    const result: DeleteResult = {
      raw: [],
      affected: 1,
    };

    jest.spyOn(repo, 'delete').mockResolvedValue(result);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });

  it('should find all image gos by global order id', async () => {
    const globalOrderId = 123;
    const imageGos: Image_Go[] = [
      new Image_Go(),
      new Image_Go(),
      new Image_Go(),
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(imageGos);

    expect(await service.findAllByGlobalOrderId(globalOrderId)).toEqual(
      imageGos,
    );
    expect(repo.find).toHaveBeenCalledWith({
      where: { image_go_go_id: globalOrderId },
    });
  });
});
