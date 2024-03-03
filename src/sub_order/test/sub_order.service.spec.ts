import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { SubOrderService } from '../sub_order.service';
import { SubOrderDto } from '../dto/sub_order.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sub_Order } from '../../entities/Sub_Order';
import { SetupSoService } from '../../setup_so/setup_so.service';
import { ImageSoService } from '../../image_so/image_so.service';
import { FailureSoService } from '../../failure_so/failure_so.service';
import { SubOrderFillWithDatasDto } from '../../main-datas/dto/main-datas.dto';
import { SetupDto } from '../../setup/dto/setup.dto';
import { Image_So } from '../../entities/image/Image_so';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { create } from 'domain';

describe('SubOrderService', () => {
  let service: SubOrderService;
  let repository: Repository<Sub_Order>;
  let setupSoService: SetupSoService;
  let imageSoService: ImageSoService;
  let failureSoService: FailureSoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubOrderService,
        {
          provide: getRepositoryToken(Sub_Order),
          useClass: Repository,
        },
        {
          provide: ImageSoService,
          useValue: createMock<ImageSoService>(),
        },
        {
          provide: SetupSoService,
          useValue: createMock<SetupSoService>(),
        },
        {
          provide: FailureSoService,
          useValue: createMock<FailureSoService>(),
        },
      ],
    }).compile();

    service = module.get<SubOrderService>(SubOrderService);
    repository = module.get<Repository<Sub_Order>>(
      getRepositoryToken(Sub_Order),
    );
    setupSoService = module.get<SetupSoService>(SetupSoService);
    imageSoService = module.get<ImageSoService>(ImageSoService);
    failureSoService = module.get<FailureSoService>(FailureSoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sub order', async () => {
      const createSubOrderDto: SubOrderDto = new SubOrderDto();
      const mockCreatedSubOrder: Sub_Order = new Sub_Order();
      jest.spyOn(repository, 'create').mockReturnValueOnce(mockCreatedSubOrder);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockCreatedSubOrder);

      const result = await service.create(createSubOrderDto);

      expect(result).toEqual(mockCreatedSubOrder);
    });
  });

  describe('findAll', () => {
    it('should return an array of sub orders', async () => {
      const mockSubOrders: Sub_Order[] = [new Sub_Order()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockSubOrders);

      const result = await service.findAll();

      expect(result).toEqual(mockSubOrders);
    });
  });

  describe('findAllByGlobalOrderId', () => {
    it('should return an array of sub orders filtered by global order id', async () => {
      const globalOrderId = 1;
      const mockSubOrders: Sub_Order[] = [new Sub_Order()];
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockSubOrders);

      const result = await service.findAllByGlobalOrderId(globalOrderId);

      expect(result).toEqual(mockSubOrders);
    });
  });

  describe('findOne', () => {
    it('should return a sub order by id', async () => {
      const id = 1;
      const mockSubOrder: Sub_Order = new Sub_Order();
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockSubOrder);

      const result = await service.findOne(id);

      expect(result).toEqual(mockSubOrder);
    });
  });

  describe('update', () => {
    it('should update a sub order by id', async () => {
      const id = 1;
      const updateSubOrderDto: SubOrderDto = new SubOrderDto();
      const mockUpdatedResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };
      jest.spyOn(repository, 'update').mockResolvedValueOnce(mockUpdatedResult);

      const result = await service.update(id, updateSubOrderDto);

      expect(result).toEqual(mockUpdatedResult);
    });
  });

  describe('remove', () => {
    it('should delete a sub order by id', async () => {
      const id = 1;
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(mockDeleteResult);

      const result = await service.remove(id);

      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('findAndFillSubOrdersByIdGlobalOrderFilledWithDatas', () => {
    it('should return an array of sub orders filled with data for a given global order id', async () => {
      const globalOrderId = 1;
      const mockSubOrders: SubOrderDto[] = [new SubOrderDto()];
      const mockSetupSoList: SetupDto[] = [new SetupDto()];
      const mockImageSoList: Image_So[] = [new Image_So()];
      const mockFailureSoList: FailureDto[] = [new FailureDto()];
      const mockSubOrderFillWithDatas: SubOrderFillWithDatasDto =
        new SubOrderFillWithDatasDto();

      jest
        .spyOn(service, 'findAllByGlobalOrderId')
        .mockResolvedValueOnce(mockSubOrders);
      jest
        .spyOn(setupSoService, 'findAllBySubOrderId')
        .mockResolvedValueOnce(mockSetupSoList);
      jest
        .spyOn(imageSoService, 'findAllBySubOrderId')
        .mockResolvedValueOnce(mockImageSoList);
      jest
        .spyOn(failureSoService, 'findAllBySubOrderId')
        .mockResolvedValueOnce(mockFailureSoList);

      const result =
        await service.findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
          globalOrderId,
        );

      mockSubOrderFillWithDatas.subOrder = mockSubOrders[0];
      mockSubOrderFillWithDatas.setupSo = mockSetupSoList;
      mockSubOrderFillWithDatas.imageSo = mockImageSoList;
      mockSubOrderFillWithDatas.failureSo = mockFailureSoList;

      expect(result).toEqual([mockSubOrderFillWithDatas]);
    });
  });
});
