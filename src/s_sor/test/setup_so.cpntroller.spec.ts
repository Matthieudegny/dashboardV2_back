import { Test, TestingModule } from '@nestjs/testing';
import { SsoController } from '../s_sor.rcontroller';
import { SsoService } from '../s_sor.service';
import { SsoDto } from '../dto/s_sor.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupSoController', () => {
  let controller: SsoController;
  let service: SsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SsoController],
      providers: [
        SsoService,
        {
          provide: SsoService,
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

    controller = module.get<SsoController>(SsoController);
    service = module.get<SsoService>(SsoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service with provided data and return created setup', async () => {
      const mockSetupSoDto = new SsoDto();
      const expectedResult = new SsoDto();
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(mockSetupSoDto);
      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(mockSetupSoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const expectedResult: SsoDto[] = [new SsoDto()];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single setup by id', async () => {
      const setupId = '1';
      const expectedResult = new SsoDto();
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(setupId);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+setupId);
    });
  });

  describe('update', () => {
    it('should update an existing setup and return the result', async () => {
      const setupId = '1';
      const mockSetupSoDto = new SsoDto();
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
