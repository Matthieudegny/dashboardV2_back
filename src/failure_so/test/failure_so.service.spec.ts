import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_So } from '../../entities/Failure/Failure_so';
import { FailureSoService } from '../failure_so.service';
import { Failure_SoDto } from '../dto/failure_so.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const failureSoDto = new Failure_SoDto();
const failureSo = new Failure_So();

describe('FailureSoService', () => {
  let service: FailureSoService;
  let repo: Repository<Failure_So>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureSoService,
        {
          provide: getRepositoryToken(Failure_So),
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

    service = module.get<FailureSoService>(FailureSoService);
    repo = module.get<Repository<Failure_So>>(getRepositoryToken(Failure_So));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a failure', async () => {
    jest.spyOn(repo, 'create').mockReturnValue(failureSo);
    jest.spyOn(repo, 'save').mockResolvedValue(failureSo);

    expect(await service.create(failureSoDto)).toEqual(failureSo);
    expect(repo.create).toHaveBeenCalledWith(failureSoDto);
    expect(repo.save).toHaveBeenCalledWith(failureSo);
  });

  it('should find all failures', async () => {
    const failures: Failure_So[] = [failureSo, failureSo, failureSo];

    jest.spyOn(repo, 'find').mockResolvedValue(failures);

    expect(await service.findAll()).toEqual(failures);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one failure by id', async () => {
    const id = 1;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(failureSo);

    expect(await service.findOne(id)).toEqual(failureSo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ failure_so_id: id });
  });

  it('should update a failure', async () => {
    const id = 1;
    const result: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };

    jest.spyOn(repo, 'update').mockResolvedValue(result);

    expect(await service.update(id, failureSoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, failureSoDto);
  });

  it('should remove a failure', async () => {
    const id = 1;
    const result: DeleteResult = {
      raw: [],
      affected: 1,
    };

    jest.spyOn(repo, 'delete').mockResolvedValue(result);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
