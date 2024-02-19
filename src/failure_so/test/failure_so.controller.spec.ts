import { Test, TestingModule } from '@nestjs/testing';
import { FailureSoController } from '../failure_so.controller';
import { FailureSoService } from '../failure_so.service';
import { Failure_SoDto } from '../dto/failure_so.dto';

const failureSoDto = new Failure_SoDto();

describe('FailureSoController', () => {
  let controller: FailureSoController;
  let service: FailureSoService;

  // Mocking the service
  const mockFailureSoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailureSoController],
      providers: [
        { provide: FailureSoService, useValue: mockFailureSoService },
      ],
    }).compile();

    controller = module.get<FailureSoController>(FailureSoController);
    service = module.get<FailureSoService>(FailureSoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a failure', async () => {
    await controller.create(failureSoDto);
    expect(service.create).toHaveBeenCalledWith(failureSoDto);
  });

  it('should find all failures', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one failure by id', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a failure', async () => {
    const id = '1';
    await controller.update(id, failureSoDto);
    expect(service.update).toHaveBeenCalledWith(+id, failureSoDto);
  });

  it('should remove a failure', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
