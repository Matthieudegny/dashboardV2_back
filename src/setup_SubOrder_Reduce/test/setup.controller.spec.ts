import { Test, TestingModule } from '@nestjs/testing';
import { SetupSubOrderController } from '../setup_SubOrder_Reduce.controller';
import { SetupSubOrderService } from '../setup_SubOrder_Reduce.service';
import { SetupSoDto } from '../dto/setup_SubOrder_Reduce.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupController', () => {
  let setupController: SetupSubOrderController;
  let setupService: SetupSubOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupSubOrderController],
      providers: [
        {
          provide: SetupSubOrderService,
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

    setupController = module.get<SetupSubOrderController>(
      SetupSubOrderController,
    );
    setupService = module.get<SetupSubOrderService>(SetupSubOrderService);
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
