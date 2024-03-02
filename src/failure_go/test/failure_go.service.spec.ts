import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { FailureGoService } from '../failure_go.service';
import { Failure_Go } from '../../entities/Failure/Failure_go';
import { FailureService } from '../../failure/failure.service';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { Failure } from '../../entities/Failure/Failure';

describe('FailureGoService', () => {
  let failureGoService: FailureGoService;
  let failureGoRepository: Repository<Failure_Go>;
  let failureService: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureGoService,
        FailureService,
        {
          provide: getRepositoryToken(Failure_Go),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Failure),
          useClass: Repository,
        },
      ],
    }).compile();

    failureGoService = module.get<FailureGoService>(FailureGoService);
    failureGoRepository = module.get<Repository<Failure_Go>>(
      getRepositoryToken(Failure_Go),
    );
    failureService = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(failureGoService).toBeDefined();
  });

  describe('createFailure_go', () => {
    it('should create a new failure_go', async () => {
      const mockFailureGoDto = new Failure_Go();
      const mockCreatedFailureGo = new Failure_Go();
      jest
        .spyOn(failureGoRepository, 'create')
        .mockResolvedValueOnce(undefined as never);
      jest
        .spyOn(failureGoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedFailureGo);
      const result = await failureGoService.createFailure_go(mockFailureGoDto);
      expect(result).toEqual(mockCreatedFailureGo);
    });
  });

  describe('findAll', () => {
    it('should return an array of failure_gos', async () => {
      const mockFailureGos: Failure_Go[] = [new Failure_Go()];
      jest
        .spyOn(failureGoRepository, 'find')
        .mockResolvedValueOnce(mockFailureGos);
      const result = await failureGoService.findAll();
      expect(result).toEqual(mockFailureGos);
    });
  });

  describe('findAllFailureCategoriesByGlobalOrderId', () => {
    it('should return an array of failure categories', async () => {
      const mockGlobalOrderId = 1;
      const mockListFailuresGoByGlobalOrderId: Failure_Go[] = [
        new Failure_Go(),
      ];
      const mockFailureData: FailureDto = new FailureDto();
      jest
        .spyOn(failureGoRepository, 'find')
        .mockResolvedValueOnce(mockListFailuresGoByGlobalOrderId);
      jest
        .spyOn(failureService, 'findOne')
        .mockResolvedValueOnce(mockFailureData);

      const result =
        await failureGoService.findAllFailureCategoriesByGlobalOrderId(
          mockGlobalOrderId,
        );
      expect(result).toEqual([mockFailureData]);
    });
  });

  describe('findOne', () => {
    it('should return a single failure_go', async () => {
      const mockFailureGo: Failure_Go = new Failure_Go();
      jest
        .spyOn(failureGoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockFailureGo);
      const result = await failureGoService.findOne(1);
      expect(result).toEqual(mockFailureGo);
    });
  });

  describe('update', () => {
    it('should update an existing failure_go', async () => {
      const mockFailureGoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(failureGoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);
      const result = await failureGoService.update(
        mockFailureGoId,
        new Failure_Go(),
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing failure_go', async () => {
      const mockFailureGoId = 1;
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest
        .spyOn(failureGoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);
      const result = await failureGoService.remove(mockFailureGoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
