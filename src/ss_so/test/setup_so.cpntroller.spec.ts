import { Test, TestingModule } from '@nestjs/testing';
import { SsSoController } from '../ss_so.controller';
import { SsSoService } from '../ss_so.service';
import { Ss_SoDto } from '../dto/ss_so.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupSoController', () => {
  let controller: SsSoController;
  let service: SsSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SsSoController],
      providers: [
        SsSoService,
        {
          provide: SsSoService,
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

    controller = module.get<SsSoController>(SsSoController);
    service = module.get<SsSoService>(SsSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service with provided data and return created setup', async () => {
      const mockSetupSoDto = new Ss_SoDto();
      const expectedResult = new Ss_SoDto();
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(mockSetupSoDto);
      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(mockSetupSoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const expectedResult: Ss_SoDto[] = [new Ss_SoDto()];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single setup by id', async () => {
      const setupId = '1';
      const expectedResult = new Ss_SoDto();
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(setupId);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+setupId);
    });
  });

  describe('update', () => {
    it('should update an existing setup and return the result', async () => {
      const setupId = '1';
      const mockSetupSoDto = new Ss_SoDto();
      const expectedResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(setupId, mockSetupSoDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(+setupId, mockSetupSoDto);
    });
  });

  describe('remove', () => {
    it('should delete an existing setup and return the result', async () => {
      const setupId = '1';
      const expectedResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(setupId);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(+setupId);
    });
  });
});
