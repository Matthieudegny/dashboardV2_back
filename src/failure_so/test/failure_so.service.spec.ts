import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { FailureSoService } from '../failure_so.service';
import { Failure_So } from '../../entities/Failure/Failure_so';
import { Failure_SoDto } from '../dto/failure_so.dto';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { FailureService } from '../../failure/failure.service';
import { Failure } from '../../entities/Failure/Failure';

describe('FailureSoService', () => {
  let failureSoService: FailureSoService;
  let failureSoRepository: Repository<Failure_So>;
  let failureService: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailureSoService,
        FailureService,
        {
          provide: getRepositoryToken(Failure_So),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Failure),
          useClass: Repository,
        },
      ],
    }).compile();

    failureSoService = module.get<FailureSoService>(FailureSoService);
    failureSoRepository = module.get<Repository<Failure_So>>(
      getRepositoryToken(Failure_So),
    );
    failureService = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(failureSoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new failure_so', async () => {
      const mockFailureSoDto = new Failure_SoDto();
      const mockCreatedFailureSo = new Failure_So();
      jest
        .spyOn(failureSoRepository, 'create')
        .mockReturnValueOnce(mockCreatedFailureSo);
      jest
        .spyOn(failureSoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedFailureSo);

      const result = await failureSoService.create(mockFailureSoDto);
      expect(result).toEqual(mockCreatedFailureSo);
    });
  });

  describe('findAll', () => {
    it('should return an array of failure_so', async () => {
      const mockFailureSos: Failure_So[] = [new Failure_So()];
      jest
        .spyOn(failureSoRepository, 'find')
        .mockResolvedValueOnce(mockFailureSos);

      const result = await failureSoService.findAll();
      expect(result).toEqual(mockFailureSos);
    });
  });

  describe('findAllBySubOrderId', () => {
    it('should return an array of failure categories', async () => {
      const mockGlobalOrderId = 1;
      const mockListFailuresSoBySubOrderId: Failure_So[] = [new Failure_So()];
      const mockFailureData: FailureDto = new FailureDto();
      jest
        .spyOn(failureSoRepository, 'find')
        .mockResolvedValueOnce(mockListFailuresSoBySubOrderId);
      jest
        .spyOn(failureService, 'findOne')
        .mockResolvedValueOnce(mockFailureData);

      const result =
        await failureSoService.findAllBySubOrderId(mockGlobalOrderId);
      expect(result).toEqual([mockFailureData]);
    });
  });

  describe('findOne', () => {
    it('should return a single failure_so', async () => {
      const mockFailureSo: Failure_So = new Failure_So();
      jest
        .spyOn(failureSoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockFailureSo);

      const result = await failureSoService.findOne(1);
      expect(result).toEqual(mockFailureSo);
    });
  });

  describe('update', () => {
    it('should update an existing failure_so', async () => {
      const mockFailureSoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(failureSoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await failureSoService.update(
        mockFailureSoId,
        new Failure_SoDto(),
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing failure_so', async () => {
      const mockFailureSoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(failureSoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await failureSoService.remove(mockFailureSoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
