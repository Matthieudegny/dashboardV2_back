import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_Go } from '../../entities/Failure/Failure_go';
import { FailureGoService } from '../failure_go.service';
import { Failure_GoDto } from '../dto/failure_go.dto';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm';

const failureGoDto = new Failure_GoDto();
const failureGo = new Failure_Go();

describe('FailureGoService', () => {
  let service: FailureGoService;
  let repo: Repository<Failure_Go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureGoService,
        {
          provide: getRepositoryToken(Failure_Go),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FailureGoService>(FailureGoService);
    repo = module.get<Repository<Failure_Go>>(getRepositoryToken(Failure_Go));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a failure', async () => {
    jest.spyOn(repo, 'create').mockReturnValue(failureGo);
    jest.spyOn(repo, 'save').mockResolvedValue(failureGo);

    expect(await service.createFailure_go(failureGoDto)).toEqual(failureGo);
    expect(repo.create).toHaveBeenCalledWith(failureGoDto);
    expect(repo.save).toHaveBeenCalledWith(failureGo);
  });

  it('should find all failures', async () => {
    const failures: Failure_Go[] = [failureGo, failureGo, failureGo];

    jest.spyOn(repo, 'find').mockResolvedValue(failures);

    expect(await service.findAll()).toEqual(failures);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one failure by id', async () => {
    const id = 1;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(failureGo);

    expect(await service.findOne(id)).toEqual(failureGo);
    expect(repo.findOneBy).toHaveBeenCalledWith({ failure_go_id: id });
  });

  it('should update a failure', async () => {
    const id = 1;
    const result: UpdateResult = { raw: [], affected: 1, generatedMaps: [] };
    jest.spyOn(repo, 'update').mockResolvedValue(result as UpdateResult);

    expect(await service.update(id, failureGoDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, failureGoDto);
  });

  it('should remove a failure', async () => {
    const id = 1;
    const result: DeleteResult = { raw: [], affected: 1 };

    jest.spyOn(repo, 'delete').mockResolvedValue(result as DeleteResult);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });

  it('should find all failures by global order id', async () => {
    const globalOrderId = 123;
    const failures: Failure_Go[] = [
      new Failure_Go(),
      new Failure_Go(),
      new Failure_Go(),
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(failures);

    expect(await service.findAllByGlobalOrderId(globalOrderId)).toEqual(
      failures,
    );
    expect(repo.find).toHaveBeenCalledWith({
      where: { failure_go_id: globalOrderId },
    });
  });
});
