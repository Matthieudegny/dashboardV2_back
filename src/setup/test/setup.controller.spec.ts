import { Test, TestingModule } from '@nestjs/testing';
import { SetupController } from '../setup.controller';
import { SetupService } from '../setup.service';
import { SetupDto } from '../dto/setup.dto';

const setupDto = new SetupDto(); // Initialisation de l'objet DTO en haut du fichier

describe('SetupController', () => {
  let controller: SetupController;
  let service: SetupService;

  const mockSetupService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupController],
      providers: [{ provide: SetupService, useValue: mockSetupService }],
    }).compile();

    controller = module.get<SetupController>(SetupController);
    service = module.get<SetupService>(SetupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a setup', async () => {
    await controller.create(setupDto);
    expect(service.create).toHaveBeenCalledWith(setupDto);
  });

  it('should find all setups', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one setup by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a setup', async () => {
    const id = '1';
    await controller.update(id, setupDto);
    expect(service.update).toHaveBeenCalledWith(+id, setupDto);
  });

  it('should remove a setup', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
