import { Test, TestingModule } from '@nestjs/testing';
import { SetupGoController } from '../setup_go.controller';
import { SetupGoService } from '../setup_go.service';
import { SetupGoDto } from '../dto/setup_go.dto';

const setupGoDto = new SetupGoDto();

describe('SetupGoController', () => {
  let controller: SetupGoController;
  let service: SetupGoService;

  const mockSetupGoService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id })),
    update: jest.fn((id, dto) => ({ ...dto, id })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupGoController],
      providers: [{ provide: SetupGoService, useValue: mockSetupGoService }],
    }).compile();

    controller = module.get<SetupGoController>(SetupGoController);
    service = module.get<SetupGoService>(SetupGoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a setup go', async () => {
    await controller.create(setupGoDto);
    expect(service.create).toHaveBeenCalledWith(setupGoDto);
  });

  it('should find all setup gos', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one setup go by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a setup go', async () => {
    const id = '1';
    await controller.update(id, setupGoDto);
    expect(service.update).toHaveBeenCalledWith(+id, setupGoDto);
  });

  it('should remove a setup go', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
