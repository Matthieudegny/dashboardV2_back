import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoService } from '../failure_so.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Failure_so } from '../../../entities/Failure/Failure_so';
import { CreateFailureSoParams } from '../../../utils/types';

const failureSo = new Failure_so();

describe('FailureSoService', () => {
  let service: FailureSoService;
  let repository: Repository<Failure_so>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureSoService,
        {
          provide: getRepositoryToken(Failure_so),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FailureSoService>(FailureSoService);
    repository = module.get<Repository<Failure_so>>(
      getRepositoryToken(Failure_so),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFailure', () => {
    it('should return an array of failures', async () => {
      const mockFailures: Failure_so[] = [failureSo];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockFailures);
      const result = await service.findAllFailure();
      expect(result).toEqual(mockFailures);
    });
  });

  describe('findOne', () => {
    it('should return a single failure', async () => {
      const mockFailure: Failure_so = failureSo;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockFailure);
      const result = await service.findOne(1);
      expect(result).toEqual(mockFailure);
    });
  });

  describe('createFailure', () => {
    it('should create a new failure', async () => {
      const mockFailureDetails: CreateFailureSoParams = failureSo;
      const mockCreatedFailure: Failure_so = failureSo;
      jest.spyOn(repository, 'create').mockReturnValueOnce(mockCreatedFailure);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockCreatedFailure);
      const result = await service.createFailure(mockFailureDetails);
      expect(result).toEqual(mockCreatedFailure);
    });
  });

  describe('updateFailure', () => {
    it('should update an existing failure', async () => {
      const mockFailureId = 1;
      const mockFailureDetails: CreateFailureSoParams = failureSo;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest.spyOn(repository, 'update').mockResolvedValueOnce(mockUpdateResult);
      const result = await service.updateFailure(
        mockFailureId,
        mockFailureDetails,
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('deleteFailure', () => {
    it('should delete an existing failure', async () => {
      const mockFailureId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(mockDeleteResult);
      const result = await service.deleteFailure(mockFailureId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
