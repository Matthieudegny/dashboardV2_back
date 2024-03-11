import { Test, TestingModule } from '@nestjs/testing';
import { Fs_So_Controller } from '../../fs_so/fs_so.controller';
import { Fs_So_Service } from '../../fs_so/fs_so.service';
import { Fs_So_Dto } from '../../fs_so/dto/fs_so.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

const failureDto = new Fs_So_Dto();

describe('Fs_So_Controller', () => {
  let controller: Fs_So_Controller;
  let service: Fs_So_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Fs_So_Controller],
      providers: [
        {
          provide: Fs_So_Service,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<Fs_So_Controller>(Fs_So_Controller);
    service = module.get<Fs_So_Service>(Fs_So_Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a fs_so', async () => {
    const expectedResult: Fs_So_Dto = new Fs_So_Dto();
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

    expect(await controller.create(failureDto)).toBe(expectedResult);
  });

  it('should find all fs_so', async () => {
    const expectedResult: Fs_So_Dto[] = [new Fs_So_Dto()];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

    expect(await controller.findAll()).toBe(expectedResult);
  });

  it('should find one fs_so', async () => {
    const expectedResult: Fs_So_Dto = new Fs_So_Dto();
    const id = '1';
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

    expect(await controller.findOne(id)).toBe(expectedResult);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a fs_so', async () => {
    const expectedResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };
    const id = '1';
    jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

    expect(await controller.update(id, failureDto)).toBe(expectedResult);
    expect(service.update).toHaveBeenCalledWith(+id, failureDto);
  });

  it('should remove a fs_so', async () => {
    const expectedResult: DeleteResult = {
      affected: 1,
      raw: {},
    };
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

    expect(await controller.remove(id)).toBe(expectedResult);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
