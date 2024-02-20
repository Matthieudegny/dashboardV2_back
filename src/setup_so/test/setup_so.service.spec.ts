import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupSoService } from '../setup_so.service';
import { SetupSoDto } from '../dto/setup_so.dto';
import { Setup_So } from '../../entities/Setup/Setup_so';
import { UpdateResult, DeleteResult } from 'typeorm';

const setupSoDto = new SetupSoDto(); // Instance of the DTO at the top
const setupSo = new Setup_So(); // Entity instance at the top

describe('SetupSoService', () => {
  let service: SetupSoService;
  let repo: Repository<Setup_So>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupSoService,
        {
          provide: getRepositoryToken(Setup_So),
          useValue: {
            create: jest.fn().mockReturnValue(setupSo),
            save: jest.fn().mockResolvedValue(setupSo),
            find: jest.fn().mockResolvedValue([setupSo]),
            findOneBy: jest.fn().mockResolvedValue(setupSo),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<SetupSoService>(SetupSoService);
    repo = module.get<Repository<Setup_So>>(getRepositoryToken(Setup_So));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a setup so', async () => {
    expect(await service.create(setupSoDto)).toEqual(setupSo);
    expect(repo.create).toHaveBeenCalledWith(setupSoDto);
    expect(repo.save).toHaveBeenCalledWith(setupSo);
  });

  it('should find all setup sos', async () => {
    expect(await service.findAll()).toEqual([setupSo]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one setup so by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(setupSo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ setup_so_id: id });
  });

  it('should update a setup so', async () => {
    const id = 1;
    const result = new UpdateResult();
    expect(await service.update(id, setupSoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, setupSoDto);
  });

  it('should remove a setup so', async () => {
    const id = 1;
    const result = new DeleteResult();
    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
