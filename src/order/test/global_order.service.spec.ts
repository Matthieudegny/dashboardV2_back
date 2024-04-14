import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { OrderService } from '../order.service';
import { Order } from '../../entities/Order';
import { OrderDto } from '../dto/order.dto';

import { EntityManager } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { GlobalOrderDto } from '../../main-datas/dto/main-datas.dto';
import { SubOrderFillWithDatasDto } from '../../main-datas/dto/main-datas.dto';

// import { FailureService } from '../../failure/failure.service';
// import { Failure } from '../../entities/Failure/Failure';

//others entities used
import { Image_Go } from '../../entities/image/ImageOrder';
import { Fg_Go } from '../../entities/Failure/Associations/Fg_go';
import { So } from '../../entities/Setup/Associations/So';
import { Sub_Order } from '../../entities/Sub_order';
import { Image_So } from '../../entities/image/Image_so';

//other services used
import { SetupGoService } from '../../setup_go/setup_go.service';
import { ImageOrderService } from '../../image_go/imageOrder.service';
import { FailureGoService } from '../../failure_go/failure_go.service';
import { SubOrderService } from '../../sub_order/sub_order.service';
import { FailureDto } from '../../failure/dtos/failure.dto';
import { SetupGoDto } from '../../setup_go/dto/setup_go.dto';
import { SetupDto } from '../../setup/dto/setup.dto';
import { ImageOrderDto } from '../../image_go/dto/imageOrder.dto';
import { ImageOrderModule } from '../../image_go/imageOrder.module';
import { ImageSoDto } from 'src/image_so/dto/image_so.dto';

const global_order = new Order();
const globalOrderFillWithDatas = new OrderDto();

describe('GlobalOrderService', () => {
  let globalOrderService: OrderService;
  let globalOrderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: SetupGoService,
          useValue: createMock<SetupGoService>(),
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: ImageOrderService,
          useValue: createMock<ImageOrderService>(),
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

    globalOrderService = module.get<OrderService>(OrderService);
    globalOrderRepository = module.get<Repository<Order>>(
      getRepositoryToken(Order),
    );
  });

  it('should be defined', () => {
    expect(globalOrderService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new global order', async () => {
      const createGlobalOrderDto: OrderDto = global_order;
      const mockCreatedGlobalOrder: Order = global_order;

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
      const mockGlobalOrders: Order[] = [global_order];

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
      const mockGlobalOrders: Order[] = [global_order];

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
      const mockGlobalOrder: Order = global_order;

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
      const mockUpdatedResult: OrderDto = global_order;

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
      const mockGlobalOrders: OrderDto[] = [global_order];
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
      subOrderFillWithDatas.listSsgo = setupSo;
      subOrderFillWithDatas.imageSo = imageSo;

      globalOrderFillWithDatas.globalSubOrderList = [subOrderFillWithDatas];
      globalOrderFillWithDatas.globalOrder = global_order;
      globalOrderFillWithDatas.failureGo = failureGo;
      globalOrderFillWithDatas.listSg_go = setupGo;
      globalOrderFillWithDatas.imageGo = imageGo;

      const mockGlobalOrderFillWithData: OrderDto[] = [
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
