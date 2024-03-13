import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { SetupGoService } from '../setupGo.service';
import { SetupGoDto } from '../dto/setup_go.dto';
import { Setup_go } from '../../entities/Setup/Setup_go';

describe('SetupService', () => {
  let setupService: SetupGoService;
  let setupRepository: Repository<Setup_go>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupGoService,
        {
          provide: getRepositoryToken(Setup_go),
          useClass: Repository,
        },
      ],
    }).compile();

    setupService = module.get<SetupGoService>(SetupGoService);
    setupRepository = module.get<Repository<Setup_go>>(
      getRepositoryToken(Setup_go),
    );
  });

  it('should be defined', () => {
    expect(setupService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setup', async () => {
      const mockSetupDto = new SetupGoDto();
      const mockCreatedSetup = new Setup_go();
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
      const mockSetups: Setup_go[] = [new Setup_go()];
      jest.spyOn(setupRepository, 'find').mockResolvedValueOnce(mockSetups);

      const result = await setupService.findAll();
      expect(result).toEqual(mockSetups);
    });
  });

  describe('findOne', () => {
    it('should return a single setup', async () => {
      const mockSetup = new Setup_go();
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

      const result = await setupService.update(mockSetupId, new SetupGoDto());
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
