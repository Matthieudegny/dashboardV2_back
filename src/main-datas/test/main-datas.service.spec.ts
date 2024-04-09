import { Test, TestingModule } from '@nestjs/testing';
import { MainDatasService } from '../main-datas.service';
import { GlobalOrderService } from '../../global_order/global_order.service';
import { SetupService } from '../../setup/setup.service';
import { FailureService } from '../../failure/failure.service';
import { GlobalOrderDto, MainDatasDto } from '../dto/main-datas.dto';

//dtos used
import { SetupDto } from '../../setup/dto/setup.dto';
import { FailureDto } from '../../failure/dtos/failure.dto';

describe('MainDatasService', () => {
  let mainDatasService: MainDatasService;
  let globalOrderService: GlobalOrderService;
  let setupService: SetupService;
  let failureService: FailureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainDatasService,
        {
          provide: GlobalOrderService,
          useValue: {
            findAllGlobalOrdersByIdUserFilledWithData: jest.fn(),
          },
        },
        {
          provide: SetupService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: FailureService,
          useValue: {
            findAllFailure: jest.fn(),
          },
        },
      ],
    }).compile();

    mainDatasService = module.get<MainDatasService>(MainDatasService);
    globalOrderService = module.get<GlobalOrderService>(GlobalOrderService);
    setupService = module.get<SetupService>(SetupService);
    failureService = module.get<FailureService>(FailureService);
  });

  it('should be defined', () => {
    expect(mainDatasService).toBeDefined();
  });

  describe('findMainDatasbyIdUser', () => {
    it('should return main datas', async () => {
      const idUser = 1;

      const setup: SetupDto = new SetupDto();
      const failure: FailureDto = new FailureDto();
      const globalOrder: GlobalOrderDto = new GlobalOrderDto();
      const mockMainDatas: MainDatasDto = {
        setupList: [setup],
        failureList: [failure],
        globalOrderList: [globalOrder],
      };

      jest
        .spyOn(setupService, 'findAll')
        .mockResolvedValueOnce(mockMainDatas.setupList);
      jest
        .spyOn(failureService, 'findAllFailure')
        .mockResolvedValueOnce(mockMainDatas.failureList);
      jest
        .spyOn(globalOrderService, 'findAllGlobalOrdersByIdUserFilledWithData')
        .mockResolvedValueOnce(mockMainDatas.globalOrderList);

      const result = await mainDatasService.findMainDatasbyIdUser(idUser);
      expect(result).toEqual(mockMainDatas);
    });

    it('should throw an error if any service fails', async () => {
      const idUser = 1;
      jest
        .spyOn(setupService, 'findAll')
        .mockRejectedValueOnce(new Error('Failed to fetch setup data'));
      jest.spyOn(failureService, 'findAllFailure').mockResolvedValueOnce([]);
      jest
        .spyOn(globalOrderService, 'findAllGlobalOrdersByIdUserFilledWithData')
        .mockResolvedValueOnce([]);

      await expect(
        mainDatasService.findMainDatasbyIdUser(idUser),
      ).rejects.toThrowError();
    });
  });
});
