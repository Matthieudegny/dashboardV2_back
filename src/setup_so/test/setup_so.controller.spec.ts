import { Test, TestingModule } from '@nestjs/testing';
import { SetupSoController } from '../setup_so.controller';
import { SetupSoService } from '../setup_so.service';
import { SetupSoDto } from '../dto/setup_so.dto';

const setupSoDto = new SetupSoDto();

describe('SetupSoController', () => {
  let controller: SetupSoController;
  let service: SetupSoService;

  const mockSetupSoService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupSoController],
      providers: [{ provide: SetupSoService, useValue: mockSetupSoService }],
    }).compile();

    controller = module.get<SetupSoController>(SetupSoController);
    service = module.get<SetupSoService>(SetupSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a setup so', async () => {
    await controller.create(setupSoDto);
    expect(service.create).toHaveBeenCalledWith(setupSoDto);
  });

  it('should find all setup sos', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one setup so by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a setup so', async () => {
    const id = '1';
    await controller.update(id, setupSoDto);
    expect(service.update).toHaveBeenCalledWith(+id, setupSoDto);
  });

  it('should remove a setup so', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
