import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure } from '../../entities/Failure/Failure';
import { FailureService } from '../failure.service';
import { CreateFailureParams } from '../../utils/types';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm';

describe('FailureService', () => {
  let service: FailureService;
  let repo: Repository<Failure>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureService,
        {
          provide: getRepositoryToken(Failure),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FailureService>(FailureService);
    repo = module.get<Repository<Failure>>(getRepositoryToken(Failure));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a failure', async () => {
    const failureDetails: CreateFailureParams = {
      failure_id: 1,
      failure_title: 'failureTitle',
      failure_description: 'failureDescription',
    };
    const failure: Failure = {
      failure_id: 1,
      failure_title: 'failureTitle',
      failure_description: 'failureDescription',
    };

    jest.spyOn(repo, 'create').mockReturnValue(failure);
    jest.spyOn(repo, 'save').mockResolvedValue(failure);

    expect(await service.createFailure(failureDetails)).toEqual(failure);
    expect(repo.create).toHaveBeenCalledWith(failureDetails);
    expect(repo.save).toHaveBeenCalledWith(failure);
  });

  it('should find all failures', async () => {
    const failures: Failure[] = [
      {
        failure_id: 1,
        failure_title: 'failureTitle',
        failure_description: 'failureDescription',
      },
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(failures);

    expect(await service.findAllFailure()).toEqual(failures);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should update a failure', async () => {
    const id = 1;
    const failureDetails: CreateFailureParams = {
      failure_id: 1,
      failure_title: 'failureTitle',
      failure_description: 'failureDescription',
    };
    const result: UpdateResult = { raw: [], affected: 1, generatedMaps: [] };
    jest.spyOn(repo, 'update').mockResolvedValue(result as UpdateResult);

    expect(await service.updateFailure(id, failureDetails)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, failureDetails);
  });

  it('should delete a failure', async () => {
    const id = 1;
    const result: DeleteResult = { raw: [], affected: 1 };

    jest.spyOn(repo, 'delete').mockResolvedValue(result as DeleteResult);

    expect(await service.deleteFailure(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
