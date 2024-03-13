import { Test, TestingModule } from '@nestjs/testing';
import { SetupSoController } from '../setupSo.controller';
import { SetupSoService } from '../setupSo.service';
import { SetupSoDto } from '../dto/setupSo.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupController', () => {
  let setupController: SetupSoController;
  let setupService: SetupSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupSoController],
      providers: [
        {
          provide: SetupSoService,
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

    setupController = module.get<SetupSoController>(SetupSoController);
    setupService = module.get<SetupSoService>(SetupSoService);
  });

  it('should be defined', () => {
    expect(setupController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new setup', async () => {
      const expectedResult: SetupSoDto = new SetupSoDto();
      jest.spyOn(setupService, 'create').mockResolvedValueOnce(expectedResult);

      expect(await setupController.create(new SetupSoDto())).toBe(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('should find all setups', async () => {
      const expectedResult: SetupSoDto[] = [new SetupSoDto()];
      jest.spyOn(setupService, 'findAll').mockResolvedValueOnce(expectedResult);

      expect(await setupController.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should find one setup', async () => {
      const expectedResult: SetupSoDto = new SetupSoDto();
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

      expect(await setupController.update(id, new SetupSoDto())).toBe(
        expectedResult,
      );
      expect(setupService.update).toHaveBeenCalledWith(+id, new SetupSoDto());
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
