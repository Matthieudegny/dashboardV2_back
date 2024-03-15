import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { Fs_SoService } from '../../fs_so/fs_so.service';
import { Fs_So } from '../../entities/Failure/Associations/Fs_So';
import { Fs_So_Dto } from '../../fs_so/dto/fs_so.dto';

import { FailureSoDto } from '../../failure_so/dtos/failureSo.dto';
import { FailureSoService } from '../../failure_so/failure_so.service';
import { Failure_so } from '../../entities/Failure/Failure_so';

describe('Fs_So_Service', () => {
  let fsSoService: Fs_SoService;
  let fsSoRepository: Repository<Fs_So>;
  let failureSoService: FailureSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Fs_SoService,
        FailureSoService,
        {
          provide: getRepositoryToken(Fs_So),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Failure_so),
          useClass: Repository,
        },
      ],
    }).compile();

    fsSoService = module.get<Fs_SoService>(Fs_SoService);
    fsSoRepository = module.get<Repository<Fs_So>>(getRepositoryToken(Fs_So));
    failureSoService = module.get<FailureSoService>(FailureSoService);
  });

  it('should be defined', () => {
    expect(fsSoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new fs_so', async () => {
      const mockFsSoDto = new Fs_So_Dto();
      const mockCreatedFsSo = new Fs_So();
      jest.spyOn(fsSoRepository, 'create').mockReturnValueOnce(mockCreatedFsSo);
      jest.spyOn(fsSoRepository, 'save').mockResolvedValueOnce(mockCreatedFsSo);

      const result = await fsSoService.create(mockFsSoDto);
      expect(result).toEqual(mockCreatedFsSo);
    });
  });

  describe('findAll', () => {
    it('should return an array of fs_so', async () => {
      const mockFsSos: Fs_So[] = [new Fs_So()];
      jest.spyOn(fsSoRepository, 'find').mockResolvedValueOnce(mockFsSos);

      const result = await fsSoService.findAll();
      expect(result).toEqual(mockFsSos);
    });
  });

  describe('findAllBySubOrderId', () => {
    it('should return an array of failure categories', async () => {
      const mockGlobalOrderId = 1;
      const mockListFailuresSoBySubOrderId: Fs_So[] = [new Fs_So()];
      const mockFailureData: FailureSoDto = new FailureSoDto();
      jest
        .spyOn(fsSoRepository, 'find')
        .mockResolvedValueOnce(mockListFailuresSoBySubOrderId);
      jest
        .spyOn(failureSoService, 'findOne')
        .mockResolvedValueOnce(mockFailureData);

      const result = await fsSoService.findAllBySubOrderId(mockGlobalOrderId);
      expect(result).toEqual([mockFailureData]);
    });
  });

  describe('findOne', () => {
    it('should return a single fs_so', async () => {
      const mockFsSo: Fs_So = new Fs_So();
      jest.spyOn(fsSoRepository, 'findOneBy').mockResolvedValueOnce(mockFsSo);

      const result = await fsSoService.findOne(1);
      expect(result).toEqual(mockFsSo);
    });
  });

  describe('update', () => {
    it('should update an existing fs_so', async () => {
      const mockFsSoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(fsSoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await fsSoService.update(mockFsSoId, new Fs_So_Dto());
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing fs_so', async () => {
      const mockFsSoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(fsSoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await fsSoService.remove(mockFsSoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
