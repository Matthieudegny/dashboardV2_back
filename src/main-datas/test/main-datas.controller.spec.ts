import { Test, TestingModule } from '@nestjs/testing';
import { MainDatasController } from '../main-datas.controller';
import { MainDatasService } from '../main-datas.service';
import { MainDatasDto } from '../dto/main-datas.dto';

const mainDatasDto = new MainDatasDto(); // Initialisation de l'objet DTO

describe('MainDatasController', () => {
  let controller: MainDatasController;
  let service: MainDatasService;

  const mockMainDatasService = {
    findMainDatasbyIdUser: jest.fn((idUser) => mainDatasDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainDatasController],
      providers: [
        { provide: MainDatasService, useValue: mockMainDatasService },
      ],
    }).compile();

    controller = module.get<MainDatasController>(MainDatasController);
    service = module.get<MainDatasService>(MainDatasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find main datas by idUser', async () => {
    const idUser = 123; // Example idUser
    await controller.findMainDatasbyIdUser(idUser);
    expect(service.findMainDatasbyIdUser).toHaveBeenCalledWith(idUser);
  });
});
