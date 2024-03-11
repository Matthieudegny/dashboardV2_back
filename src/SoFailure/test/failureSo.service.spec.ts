import { Test, TestingModule } from '@nestjs/testing';
import { FailureSo_Service } from '../failure_so.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Failure_So } from '../../entities/Failure/Failure_So';
import { CreateFailureSoParams } from '../../utils/types';

const failureSo = new Failure_So();

describe('FailureSoService', () => {
  let service: FailureSo_Service;
  let repository: Repository<Failure_So>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureSo_Service,
        {
          provide: getRepositoryToken(Failure_So),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FailureSo_Service>(FailureSo_Service);
    repository = module.get<Repository<Failure_So>>(
      getRepositoryToken(Failure_So),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFailure', () => {
    it('should return an array of failures', async () => {
      const mockFailures: Failure_So[] = [failureSo];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockFailures);
      const result = await service.findAllFailure();
      expect(result).toEqual(mockFailures);
    });
  });

  describe('findOne', () => {
    it('should return a single failure', async () => {
      const mockFailure: Failure_So = failureSo;
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockFailure);
      const result = await service.findOne(1);
      expect(result).toEqual(mockFailure);
    });
  });

  describe('createFailure', () => {
    it('should create a new failure', async () => {
      const mockFailureDetails: CreateFailureSoParams = failureSo;
      const mockCreatedFailure: Failure_So = failureSo;
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
