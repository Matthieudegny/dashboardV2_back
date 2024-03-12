import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Fg_GoService } from '../fg_Go.service';
import { Fg_Go } from '../../entities/Failure/Associations/Fg_go';
import { FailureService } from '../../failure/failure.service';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { Failure_go } from '../../entities/Failure/Failure_go';

describe('FailureGoService', () => {
  let failureGoService: Fg_GoService;
  let failureGoRepository: Repository<Fg_Go>;
  let failureService: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Fg_GoService,
        FailureService,
        {
          provide: getRepositoryToken(Fg_Go),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Failure_go),
          useClass: Repository,
        },
      ],
    }).compile();

    failureGoService = module.get<Fg_GoService>(Fg_GoService);
    failureGoRepository = module.get<Repository<Fg_Go>>(
      getRepositoryToken(Fg_Go),
    );
    failureService = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(failureGoService).toBeDefined();
  });

  describe('createFailure_go', () => {
    it('should create a new failure_go', async () => {
      const mockFailureGoDto = new Fg_Go();
      const mockCreatedFailureGo = new Fg_Go();
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
      const mockFailureGos: Fg_Go[] = [new Fg_Go()];
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
      const mockListFailuresGoByGlobalOrderId: Fg_Go[] = [new Fg_Go()];
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
      const mockFailureGo: Fg_Go = new Fg_Go();
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
        new Fg_Go(),
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
