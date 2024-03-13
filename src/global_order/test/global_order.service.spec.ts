import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { GlobalOrderService } from '../global_order.service';
import { Global_Order } from '../../entities/Global_Order';
import { GlobalOrderDto } from '../dto/global_order.dto';

import { EntityManager } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { GlobalOrderFillWithDatasDto } from '../../main-datas/dto/main-datas.dto';
import { SubOrderFillWithDatasDto } from '../../main-datas/dto/main-datas.dto';

// import { FailureService } from '../../failure/failure.service';
// import { Failure } from '../../entities/Failure/Failure';

//others entities used
import { Image_Go } from '../../entities/image/Image_go';
import { Fg_Go } from '../../entities/Failure/Associations/Fg_go';
import { Sg_Go } from '../../entities/Setup/Associations/Ss_go';
import { Sub_Order } from '../../entities/Sub_order';
import { Image_So } from '../../entities/image/Image_so';

//other services used
import { SetupGoService } from '../../setup_go/setup_go.service';
import { ImageGoService } from '../../image_go/image_go.service';
import { FailureGoService } from '../../failure_go/failure_go.service';
import { SubOrderService } from '../../sub_order/sub_order.service';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { SetupGoDto } from '../../setup_go/dto/setup_go.dto';
import { SetupDto } from '../../setup/dto/setup.dto';
import { ImageGoDto } from '../../image_go/dto/image_go.dto';
import { ImageGoModule } from '../../image_go/image_go.module';
import { ImageSoDto } from 'src/image_so/dto/image_so.dto';

const global_order = new Global_Order();
const globalOrderFillWithDatas = new GlobalOrderFillWithDatasDto();

describe('GlobalOrderService', () => {
  let globalOrderService: GlobalOrderService;
  let globalOrderRepository: Repository<Global_Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalOrderService,
        {
          provide: SetupGoService,
          useValue: createMock<SetupGoService>(),
        },
        {
          provide: getRepositoryToken(Global_Order),
          useClass: Repository,
        },
        {
          provide: ImageGoService,
          useValue: createMock<ImageGoService>(),
        },
        {
          provide: FailureGoService,
          useValue: createMock<FailureGoService>(),
        },
        {
          provide: SubOrderService,
          useValue: createMock<SubOrderService>(),
        },
      ],
    }).compile();

    globalOrderService = module.get<GlobalOrderService>(GlobalOrderService);
    globalOrderRepository = module.get<Repository<Global_Order>>(
      getRepositoryToken(Global_Order),
    );
  });

  it('should be defined', () => {
    expect(globalOrderService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new global order', async () => {
      const createGlobalOrderDto: GlobalOrderDto = global_order;
      const mockCreatedGlobalOrder: Global_Order = global_order;

      jest
        .spyOn(globalOrderRepository, 'create')
        .mockReturnValueOnce(mockCreatedGlobalOrder);
      jest
        .spyOn(globalOrderRepository, 'save')
        .mockResolvedValueOnce(mockCreatedGlobalOrder);

      const result = await globalOrderService.create(createGlobalOrderDto);

      expect(result).toEqual(mockCreatedGlobalOrder);
    });
  });

  describe('findAll', () => {
    it('should return an array of global orders', async () => {
      const mockGlobalOrders: Global_Order[] = [global_order];

      jest
        .spyOn(globalOrderRepository, 'find')
        .mockResolvedValueOnce(mockGlobalOrders);

      const result = await globalOrderService.findAll();

      expect(result).toEqual(mockGlobalOrders);
    });
  });

  describe('findAllByIdUser', () => {
    it('should return an array of global orders filtered by user id', async () => {
      const userId = 1;
      const mockGlobalOrders: Global_Order[] = [global_order];

      jest
        .spyOn(globalOrderRepository, 'find')
        .mockResolvedValueOnce(mockGlobalOrders);

      const result = await globalOrderService.findAllByIdUser(userId);

      expect(result).toEqual(mockGlobalOrders);
    });
  });

  describe('findOne', () => {
    it('should return a global order by id', async () => {
      const id = 1;
      const mockGlobalOrder: Global_Order = global_order;

      jest
        .spyOn(globalOrderRepository, 'findOneBy')
        .mockResolvedValueOnce(mockGlobalOrder);

      const result = await globalOrderService.findOne(id);

      expect(result).toEqual(mockGlobalOrder);
    });
  });

  describe('update', () => {
    it('should update a global order by id', async () => {
      const id = 1;
      const updateGlobalOrderDto: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
      };
      const mockUpdatedResult: GlobalOrderDto = global_order;

      jest
        .spyOn(globalOrderRepository, 'update')
        .mockResolvedValueOnce(updateGlobalOrderDto);

      const result = await globalOrderService.update(id, global_order);

      expect(result).toEqual(updateGlobalOrderDto);
    });
  });

  describe('remove', () => {
    it('should delete a global order by id', async () => {
      const id = 1;
      const mockDeleteResult: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest
        .spyOn(globalOrderRepository, 'delete')
        .mockResolvedValueOnce(mockDeleteResult);

      const result = await globalOrderService.remove(id);

      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('findAllGlobalOrdersByIdUserFilledWithData', () => {
    it('should return an array of global orders filled with related data for a given user id', async () => {
      const userId = 1;
      const mockGlobalOrders: GlobalOrderDto[] = [global_order];
      const failureGo: FailureDto[] = [new FailureDto()];
      const setupGo: SetupDto[] = [new SetupDto()];
      const imageGo: Image_Go[] = [new Image_Go()];

      const subOrderFillWithDatas = new SubOrderFillWithDatasDto();
      const subOrder = new Sub_Order();
      const failureSo: FailureDto[] = [new FailureDto()];
      const setupSo: SetupDto[] = [new SetupDto()];
      const imageSo: Image_So[] = [new Image_So()];
      subOrderFillWithDatas.subOrder = subOrder;
      subOrderFillWithDatas.failureSo = failureSo;
      subOrderFillWithDatas.setupSo = setupSo;
      subOrderFillWithDatas.imageSo = imageSo;

      globalOrderFillWithDatas.subOrderList = [subOrderFillWithDatas];
      globalOrderFillWithDatas.globalOrder = global_order;
      globalOrderFillWithDatas.failureGo = failureGo;
      globalOrderFillWithDatas.setupGo = setupGo;
      globalOrderFillWithDatas.imageGo = imageGo;

      const mockGlobalOrderFillWithData: GlobalOrderFillWithDatasDto[] = [
        globalOrderFillWithDatas,
      ];

      // const mockGlobalOrderFillWithData: GlobalOrderFillWithDatasDto[] = [
      //   {
      //     globalOrder: global_order,
      //     failureGo: failureGo,
      //     setupGo: setupGo,
      //     imageGo: imageGo,
      //     subOrderList: undefined,
      //   },
      // ];

      jest
        .spyOn(globalOrderService, 'findAllByIdUser')
        .mockResolvedValueOnce(mockGlobalOrders);
      jest
        .spyOn(globalOrderService['setupGoService'], 'findAllByGlobalOrderId')
        .mockResolvedValueOnce(setupGo);
      jest
        .spyOn(globalOrderService['imageGoService'], 'findAllByGlobalOrderId')
        .mockResolvedValueOnce(imageGo);
      jest
        .spyOn(
          globalOrderService['failureGoService'],
          'findAllFailureCategoriesByGlobalOrderId',
        )
        .mockResolvedValueOnce(failureGo);
      jest
        .spyOn(
          globalOrderService['subOrderService'],
          'findAndFillSubOrdersByIdGlobalOrderFilledWithDatas',
        )
        .mockResolvedValueOnce([subOrderFillWithDatas]);

      const result =
        await globalOrderService.findAllGlobalOrdersByIdUserFilledWithData(
          userId,
        );

      expect(result).toEqual(mockGlobalOrderFillWithData);
    });
  });
});
