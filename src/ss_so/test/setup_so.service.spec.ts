import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { SsSoService } from '../ss_so.service';
import { Ss_SoDto } from '../dto/ss_so.dto';
import { Ss_So } from '../../entities/Setup/Associations/Ss_so';
import { SetupService } from '../../setup/setup.service';
import { SetupDto } from '../../setup/dto/setup.dto';

describe('SetupSoService', () => {
  let setupSoService: SsSoService;
  let setupSoRepository: Repository<Ss_So>;
  let setupService: SetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SsSoService,
        {
          provide: getRepositoryToken(Ss_So),
          useClass: Repository,
        },
        {
          provide: SetupService,
          useClass: Repository,
        },
      ],
    }).compile();

    setupSoService = module.get<SsSoService>(SsSoService);
    setupSoRepository = module.get<Repository<Ss_So>>(
      getRepositoryToken(Ss_So),
    );
    setupService = module.get<SetupService>(SetupService);
  });

  it('should be defined', () => {
    expect(setupSoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setupSo', async () => {
      const mockSetupSoDto = new Ss_SoDto();
      const mockCreatedSetupSo = new Ss_So();
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
      const mockSetups: Ss_So[] = [new Ss_So()];
      jest.spyOn(setupSoRepository, 'find').mockResolvedValueOnce(mockSetups);

      const result = await setupSoService.findAll();
      expect(result).toEqual(mockSetups);
    });
  });

  describe('findAllBySubOrderId', () => {
    it('should return setups by sub order id', async () => {
      const subOrderId = 1;
      const mockSetups: Ss_So[] = [new Ss_So()];
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
      const mockSetupSo = new Ss_So();
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

      const result = await setupSoService.update(mockSetupSoId, new Ss_SoDto());
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
