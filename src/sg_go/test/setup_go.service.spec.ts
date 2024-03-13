import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { SgGoService } from '../sg_go.service';
import { Sg_GoDto } from '../dto/sg_go.dto';
import { Sg_Go } from '../../entities/Setup/Associations/Ss_go';
import { SetupService } from '../../setup/setup.service';
import { SetupDto } from '../../setup/dto/setup.dto';

describe('SetupGoService', () => {
  let setupGoService: SgGoService;
  let setupGoRepository: Repository<Sg_Go>;
  let setupService: SetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SgGoService,
        {
          provide: getRepositoryToken(Sg_Go),
          useClass: Repository,
        },
        {
          provide: SetupService,
          useClass: Repository,
        },
      ],
    }).compile();

    setupGoService = module.get<SgGoService>(SgGoService);
    setupGoRepository = module.get<Repository<Sg_Go>>(
      getRepositoryToken(Sg_Go),
    );
    setupService = module.get<SetupService>(SetupService);
  });

  it('should be defined', () => {
    expect(setupGoService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setupGo', async () => {
      const mockSetupGoDto = new Sg_GoDto();
      const mockCreatedSetupGo = new Sg_Go();
      jest
        .spyOn(setupGoRepository, 'create')
        .mockReturnValueOnce(mockCreatedSetupGo);
      jest
        .spyOn(setupGoRepository, 'save')
        .mockResolvedValueOnce(mockCreatedSetupGo);

      const result = await setupGoService.create(mockSetupGoDto);
      expect(result).toEqual(mockCreatedSetupGo);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const mockSetups: Sg_Go[] = [new Sg_Go()];
      jest.spyOn(setupGoRepository, 'find').mockResolvedValueOnce(mockSetups);

      const result = await setupGoService.findAll();
      expect(result).toEqual(mockSetups);
    });
  });

  describe('findAllByGlobalOrderId', () => {
    it('should return setups by global order id', async () => {
      const globalOrderId = 1;
      const mockSetups: Sg_Go[] = [new Sg_Go()];
      const mockSetupDtos: SetupDto[] = [new SetupDto()];
      jest.spyOn(setupGoRepository, 'find').mockResolvedValueOnce(mockSetups);
      jest
        .spyOn(setupService, 'findOne')
        .mockResolvedValueOnce(mockSetupDtos[0]);

      const result = await setupGoService.findAllByGlobalOrderId(globalOrderId);
      expect(result).toEqual(mockSetupDtos);
      expect(setupService.findOne).toHaveBeenCalledWith(
        mockSetups[0].setup_go_setup_id,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single setupGo', async () => {
      const mockSetupGo = new Sg_Go();
      jest
        .spyOn(setupGoRepository, 'findOneBy')
        .mockResolvedValueOnce(mockSetupGo);

      const result = await setupGoService.findOne(1);
      expect(result).toEqual(mockSetupGo);
    });
  });

  describe('update', () => {
    it('should update an existing setupGo', async () => {
      const mockSetupGoId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(setupGoRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await setupGoService.update(mockSetupGoId, new Sg_GoDto());
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing setupGo', async () => {
      const mockSetupGoId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(setupGoRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await setupGoService.remove(mockSetupGoId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
