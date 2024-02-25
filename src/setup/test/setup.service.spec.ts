import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupService } from '../setup.service';
import { SetupDto } from '../dto/setup.dto';
import { Setup } from '../../entities/setup/Setup';
import { UpdateResult, DeleteResult } from 'typeorm';

const setupDto = new SetupDto(); // Définition en haut du fichier
const setup = new Setup(); // Instance de l'entité

describe('SetupService', () => {
  let service: SetupService;
  let repo: Repository<Setup>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupService,
        {
          provide: getRepositoryToken(Setup),
          useValue: {
            create: jest.fn().mockReturnValue(setup),
            save: jest.fn().mockResolvedValue(setup),
            find: jest.fn().mockResolvedValue([setup]),
            findOneBy: jest.fn().mockResolvedValue(setup),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<SetupService>(SetupService);
    repo = module.get<Repository<Setup>>(getRepositoryToken(Setup));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a setup', async () => {
    expect(await service.create(setupDto)).toEqual(setup);
    expect(repo.create).toHaveBeenCalledWith(setupDto);
    expect(repo.save).toHaveBeenCalledWith(setup);
  });

  it('should find all setups', async () => {
    expect(await service.findAll()).toEqual([setup]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one setup by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(setup);
    expect(repo.findOneBy).toHaveBeenCalledWith({ setup_id: id });
  });

  it('should update a setup', async () => {
    const id = 1;
    const result = new UpdateResult();
    expect(await service.update(id, setupDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, setupDto);
  });

  it('should remove a setup', async () => {
    const id = 1;
    const result = new DeleteResult();
    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
