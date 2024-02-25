import { Test, TestingModule } from '@nestjs/testing';
import { MainDatasController } from './main-datas.controller';
import { MainDatasService } from './main-datas.service';

describe('MainDatasController', () => {
  let controller: MainDatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainDatasController],
      providers: [MainDatasService],
    }).compile();

    controller = module.get<MainDatasController>(MainDatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
