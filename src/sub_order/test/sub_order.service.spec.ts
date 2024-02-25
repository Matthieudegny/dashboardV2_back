import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubOrderService } from '../sub_order.service';
import { SubOrderDto } from '../dto/sub_order.dto';
import { Sub_Order } from '../../entities/Sub_Order';
import { UpdateResult, DeleteResult } from 'typeorm';

const subOrderDto = new SubOrderDto();
const subOrder = new Sub_Order();

describe('SubOrderService', () => {
  let service: SubOrderService;
  let repo: Repository<Sub_Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubOrderService,
        {
          provide: getRepositoryToken(Sub_Order),
          useValue: {
            create: jest.fn().mockReturnValue(subOrder),
            save: jest.fn().mockResolvedValue(subOrder),
            find: jest.fn().mockResolvedValue([subOrder]),
            findOneBy: jest.fn().mockResolvedValue(subOrder),
            update: jest.fn().mockResolvedValue(new UpdateResult()),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
          },
        },
      ],
    }).compile();

    service = module.get<SubOrderService>(SubOrderService);
    repo = module.get<Repository<Sub_Order>>(getRepositoryToken(Sub_Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a sub order', async () => {
    expect(await service.create(subOrderDto)).toEqual(subOrder);
    expect(repo.create).toHaveBeenCalledWith(subOrderDto);
    expect(repo.save).toHaveBeenCalledWith(subOrder);
  });

  it('should find all sub orders', async () => {
    expect(await service.findAll()).toEqual([subOrder]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one sub order by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual(subOrder);
    expect(repo.findOneBy).toHaveBeenCalledWith({ so_id: id });
  });

  it('should update a sub order', async () => {
    const id = 1;
    const result = new UpdateResult();
    expect(await service.update(id, subOrderDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, subOrderDto);
  });

  it('should remove a sub order', async () => {
    const id = 1;
    const result = new DeleteResult();
    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });

  it('should find all sub orders by global order id', async () => {
    const globalOrderId = 123;
    const subOrders: Sub_Order[] = [
      new Sub_Order(),
      new Sub_Order(),
      new Sub_Order(),
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(subOrders);

    expect(await service.findAllByGlobalOrderId(globalOrderId)).toEqual(
      subOrders,
    );
    expect(repo.find).toHaveBeenCalledWith({
      where: { so_go_id: globalOrderId },
    });
  });
});
