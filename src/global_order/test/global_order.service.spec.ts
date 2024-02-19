import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalOrderService } from '../global_order.service';
import { GlobalOrderDto } from '../dto/global_order.dto';
import { Global_Order } from '../../entities/Global_Order';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('GlobalOrderService', () => {
  let service: GlobalOrderService;
  let repo: Repository<Global_Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalOrderService,
        {
          provide: getRepositoryToken(Global_Order),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GlobalOrderService>(GlobalOrderService);
    repo = module.get<Repository<Global_Order>>(
      getRepositoryToken(Global_Order),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a global order', async () => {
    const globalOrderDto: GlobalOrderDto = new GlobalOrderDto();
    const globalOrder: Global_Order = new Global_Order();

    jest.spyOn(repo, 'create').mockReturnValue(globalOrder);
    jest.spyOn(repo, 'save').mockResolvedValue(globalOrder);

    expect(await service.create(globalOrderDto)).toEqual(globalOrder);
    expect(repo.create).toHaveBeenCalledWith(globalOrderDto);
    expect(repo.save).toHaveBeenCalledWith(globalOrder);
  });

  it('should find all global orders', async () => {
    const globalOrder: Global_Order = new Global_Order();
    const globalOrders: Global_Order[] = [
      globalOrder,
      globalOrder,
      globalOrder,
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(globalOrders);

    expect(await service.findAll()).toEqual(globalOrders);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one global order by id', async () => {
    const id = 1;
    const globalOrder: Global_Order = new Global_Order();

    jest.spyOn(repo, 'findOneBy').mockResolvedValue(globalOrder);

    expect(await service.findOne(id)).toEqual(globalOrder);
    expect(repo.findOneBy).toHaveBeenCalledWith({ go_id: id });
  });

  it('should update a global order', async () => {
    const id = 1;
    const globalOrderDto: GlobalOrderDto = new GlobalOrderDto();
    const result: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };

    jest.spyOn(repo, 'update').mockResolvedValue(result);

    expect(await service.update(id, globalOrderDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, globalOrderDto);
  });

  it('should remove a global order', async () => {
    const id = 1;
    const result: DeleteResult = {
      raw: [],
      affected: 1,
    };

    jest.spyOn(repo, 'delete').mockResolvedValue(result);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
