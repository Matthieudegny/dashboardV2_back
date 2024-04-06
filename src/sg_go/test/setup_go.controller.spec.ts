import { Test, TestingModule } from '@nestjs/testing';
import { SetupGoController } from '../sg_go.controller';
import { SgGoService } from '../sg_go.service';
import { Sg_GoDto } from '../dto/sg_go.dto';
import { NotFoundException } from '@nestjs/common';
import { SetupDto } from '../../setup/dto/setup.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('SetupGoController', () => {
  let controller: SetupGoController;
  let service: SgGoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupGoController],
      providers: [
        SgGoService,
        {
          provide: SgGoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllByGlobalOrderId: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SetupGoController>(SetupGoController);
    service = module.get<SgGoService>(SgGoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service with provided data and return created setup', async () => {
      const mockSetupGoDto = new Sg_GoDto();
      const expectedResult = new Sg_GoDto();
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(mockSetupGoDto);
      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(mockSetupGoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of setups', async () => {
      const expectedResult: Sg_GoDto[] = [new Sg_GoDto()];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAllByGlobalOrderId', () => {
    it('should return setups by global order id', async () => {
      const globalOrderId = '1';
      const expectedResult: SetupDto[] = [new SetupDto()];
      jest
        .spyOn(service, 'findAllByGlobalOrderId')
        .mockResolvedValue(expectedResult);

      const result = await controller.findAllByGlobalOrderId(globalOrderId);
      expect(result).toEqual(expectedResult);
      expect(service.findAllSetupByGlobalOrderId).toHaveBeenCalledWith(
        +globalOrderId,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single setup by id', async () => {
      const setupId = '1';
      const expectedResult = new Sg_GoDto();
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(setupId);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+setupId);
    });
  });

  describe('update', () => {
    it('should update an existing setup and return the result', async () => {
      const setupId = '1';
      const mockSetupGoDto = new Sg_GoDto();
      const expectedResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(setupId, mockSetupGoDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(+setupId, mockSetupGoDto);
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
