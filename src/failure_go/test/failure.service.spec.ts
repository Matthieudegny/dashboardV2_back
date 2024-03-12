import { Test, TestingModule } from '@nestjs/testing';
import { FailureGoService } from '../failure_go.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Failure_go } from '../../entities/Failure/Failure_go';
import { CreateFailureParams } from '../../utils/types';

const failure = new Failure_go();
describe('FailureService', () => {
  let service: FailureGoService;
  let repository: Repository<Failure_go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureGoService,
        {
          provide: getRepositoryToken(Failure_go),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FailureGoService>(FailureGoService);
    repository = module.get<Repository<Failure_go>>(
      getRepositoryToken(Failure_go),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFailure', () => {
    it('should return an array of failures', async () => {
      const mockFailures: Failure_go[] = [failure];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockFailures);
      const result = await service.findAllFailure();
      expect(result).toEqual(mockFailures);
    });
  });

  describe('findOne', () => {
    it('should return a single failure', async () => {
      const mockFailure: Failure_go = failure;
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockFailure);
      const result = await service.findOne(1);
      expect(result).toEqual(mockFailure);
    });
  });

  describe('createFailure', () => {
    it('should create a new failure', async () => {
      const mockFailureDetails: CreateFailureParams = failure;
      const mockCreatedFailure: Failure_go = failure;
      jest.spyOn(repository, 'create').mockReturnValueOnce(mockCreatedFailure);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockCreatedFailure);
      const result = await service.createFailure(mockFailureDetails);
      expect(result).toEqual(mockCreatedFailure);
    });
  });

  describe('updateFailure', () => {
    it('should update an existing failure', async () => {
      const mockFailureId = 1;
      const mockFailureDetails: CreateFailureParams = failure;
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
