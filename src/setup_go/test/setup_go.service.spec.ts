import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupGoService } from '../setup_go.service';
import { SetupGoDto } from '../dto/setup_go.dto';
import { Setup_Go } from '../../entities/Setup/Setup_go';
import { UpdateResult, DeleteResult } from 'typeorm';

const setupGoDto = new SetupGoDto();
const setupGo = new Setup_Go();

describe('SetupGoService', () => {
  let service: SetupGoService;
  let repo: Repository<Setup_Go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupGoService,
        {
          provide: getRepositoryToken(Setup_Go),
          useValue: {
            create: jest.fn().mockReturnValue(setupGo),
            save: jest.fn().mockResolvedValue(setupGo),
            find: jest.fn().mockResolvedValue([setupGo]),
            findOneBy: jest.fn().mockResolvedValue(setupGo),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<SetupGoService>(SetupGoService);
    repo = module.get<Repository<Setup_Go>>(getRepositoryToken(Setup_Go));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a setup go', async () => {
    expect(await service.create(setupGoDto)).toEqual(setupGo);
    expect(repo.create).toHaveBeenCalledWith(setupGoDto);
    expect(repo.save).toHaveBeenCalledWith(setupGo);
  });

  it('should find all setup gos', async () => {
    expect(await service.findAll()).toEqual([setupGo]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one setup go by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(setupGo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ setup_go_id: id });
  });

  it('should update a setup go', async () => {
    const id = 1;
    const result = new UpdateResult();
    expect(await service.update(id, setupGoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, setupGoDto);
  });

  it('should remove a setup go', async () => {
    const id = 1;
    const result = new DeleteResult();
    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
