import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { SetupSubOrderService } from '../setupSubOrder.service';
import { SetupSoDto } from '../dto/setupSubOrder.dto';
import { SetupOrder } from '../../entities/Setup/SetupOrder';

describe('SetupService', () => {
  let setupService: SetupSubOrderService;
  let setupRepository: Repository<SetupOrder>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupSubOrderService,
        {
          provide: getRepositoryToken(SetupOrder),
          useClass: Repository,
        },
      ],
    }).compile();

    setupService = module.get<SetupSubOrderService>(SetupSubOrderService);
    setupRepository = module.get<Repository<SetupOrder>>(
      getRepositoryToken(SetupOrder),
    );
  });

  it('should be defined', () => {
    expect(setupService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setup', async () => {
      const mockSetupDto = new SetupSoDto();
      const mockCreatedSetup = new SetupOrder();
      jest
        .spyOn(setupRepository, 'create')
        .mockReturnValueOnce(mockCreatedSetup);
      jest
        .spyOn(setupRepository, 'save')
        .mockResolvedValueOnce(mockCreatedSetup);

      const result = await setupService.create(mockSetupDto);
      expect(result).toEqual(mockCreatedSetup);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const mockSetups: SetupOrder[] = [new SetupOrder()];
      jest.spyOn(setupRepository, 'find').mockResolvedValueOnce(mockSetups);

      const result = await setupService.findAll();
      expect(result).toEqual(mockSetups);
    });
  });

  describe('findOne', () => {
    it('should return a single setup', async () => {
      const mockSetup = new SetupOrder();
      jest.spyOn(setupRepository, 'findOneBy').mockResolvedValueOnce(mockSetup);

      const result = await setupService.findOne(1);
      expect(result).toEqual(mockSetup);
    });
  });

  describe('update', () => {
    it('should update an existing setup', async () => {
      const mockSetupId = 1;
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest
        .spyOn(setupRepository, 'update')
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await setupService.update(mockSetupId, new SetupSoDto());
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('remove', () => {
    it('should delete an existing setup', async () => {
      const mockSetupId = 1;
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      jest
        .spyOn(setupRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await setupService.remove(mockSetupId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
