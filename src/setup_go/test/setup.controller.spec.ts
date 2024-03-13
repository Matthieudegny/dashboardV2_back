import { Test, TestingModule } from '@nestjs/testing';
import { SetupGoController } from '../setupGo.controller';
import { SetupGoService } from '../setupGo.service';
import { SetupGoDto } from '../dto/setup_go.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupController', () => {
  let setupController: SetupGoController;
  let setupService: SetupGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupGoController],
      providers: [
        {
          provide: SetupGoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    setupController = module.get<SetupGoController>(SetupGoController);
    setupService = module.get<SetupGoService>(SetupGoService);
  });

  it('should be defined', () => {
    expect(setupController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setup', async () => {
      const expectedResult: SetupGoDto = new SetupGoDto();
      jest.spyOn(setupService, 'create').mockResolvedValueOnce(expectedResult);

      expect(await setupController.create(new SetupGoDto())).toBe(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('should find all setups', async () => {
      const expectedResult: SetupGoDto[] = [new SetupGoDto()];
      jest.spyOn(setupService, 'findAll').mockResolvedValueOnce(expectedResult);

      expect(await setupController.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should find one setup', async () => {
      const expectedResult: SetupGoDto = new SetupGoDto();
      const id = '1';
      jest.spyOn(setupService, 'findOne').mockResolvedValueOnce(expectedResult);

      expect(await setupController.findOne(id)).toBe(expectedResult);
      expect(setupService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a setup', async () => {
      const expectedResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };

      const id = '1';
      jest.spyOn(setupService, 'update').mockResolvedValueOnce(expectedResult);

      expect(await setupController.update(id, new SetupGoDto())).toBe(
        expectedResult,
      );
      expect(setupService.update).toHaveBeenCalledWith(+id, new SetupGoDto());
    });
  });

  describe('remove', () => {
    it('should remove a setup', async () => {
      const expectedResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      const id = '1';
      jest.spyOn(setupService, 'remove').mockResolvedValueOnce(expectedResult);

      expect(await setupController.remove(id)).toBe(expectedResult);
      expect(setupService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
