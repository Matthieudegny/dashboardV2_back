import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { SetupSoService } from '../setup_so.service';
import { SetupSoDto } from '../dto/setup_so.dto';
import { Setup_So } from '../../entities/setup/Setup_so';
import { SetupService } from '../../setup/setup.service';
import { SetupDto } from '../../setup/dto/setup.dto';

describe('SetupSoService', () => {
  let setupSoService: SetupSoService;
  let setupSoRepository: Repository<Setup_So>;
  let setupService: SetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupSoService,
        {
          provide: getRepositoryToken(Setup_So),
          useClass: Repository,
        },
        {
          provide: SetupService,
          useClass: Repository,
        },
      ],
    }).compile();

    setupSoService = module.get<SetupSoService>(SetupSoService);
    setupSoRepository = module.get<Repository<Setup_So>>(
      getRepositoryToken(Setup_So),
    );
    setupService = module.get<SetupService>(SetupService);
  });

  it('should be defined', () => {
    expect(setupSoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setupSo', async () => {
      const mockSetupSoDto = new SetupSoDto();
      const mockCreatedSetupSo = new Setup_So();
      jest
        .spyOn(setupSoRepository, 'create')
        .mockReturnValueOnce(mockCreatedSetupSo);
      jest
        .spyOn(setupSoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedSetupSo);

      const result = await setupSoService.create(mockSetupSoDto);
      expect(result).toEqual(mockCreatedSetupSo);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const mockSetups: Setup_So[] = [new Setup_So()];
      jest.spyOn(setupSoRepository, 'find').mockResolvedValueOnce(mockSetups);

      const result = await setupSoService.findAll();
      expect(result).toEqual(mockSetups);
    });
  });

  describe('findAllBySubOrderId', () => {
    it('should return setups by sub order id', async () => {
      const subOrderId = 1;
      const mockSetups: Setup_So[] = [new Setup_So()];
      const mockSetupDtos: SetupDto[] = [new SetupDto()];
      jest.spyOn(setupSoRepository, 'find').mockResolvedValueOnce(mockSetups);
      jest
        .spyOn(setupService, 'findOne')
        .mockResolvedValueOnce(mockSetupDtos[0]);

      const result = await setupSoService.findAllBySubOrderId(subOrderId);
      expect(result).toEqual(mockSetupDtos);
      expect(setupService.findOne).toHaveBeenCalledWith(
        mockSetups[0].setup_so_setup_id,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single setupSo', async () => {
      const mockSetupSo = new Setup_So();
      jest
        .spyOn(setupSoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockSetupSo);

      const result = await setupSoService.findOne(1);
      expect(result).toEqual(mockSetupSo);
    });
  });

  describe('update', () => {
    it('should update an existing setupSo', async () => {
      const mockSetupSoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(setupSoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await setupSoService.update(
        mockSetupSoId,
        new SetupSoDto(),
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing setupSo', async () => {
      const mockSetupSoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(setupSoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await setupSoService.remove(mockSetupSoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
