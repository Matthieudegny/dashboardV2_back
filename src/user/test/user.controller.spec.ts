import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserDto } from '../dto/user.dto';

const userDto = new UserDto();

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateUser: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    await userController.create(userDto);
    expect(userService.create).toHaveBeenCalledWith(userDto);
  });

  it('should find all users', async () => {
    await userController.findAll();
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const id = '1';
    await userController.findOne(id);
    expect(userService.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update a user', async () => {
    const id = '1';
    await userController.update(id, userDto);
    expect(userService.updateUser).toHaveBeenCalledWith(+id, userDto);
  });

  it('should remove a user', async () => {
    const id = '1';
    await userController.remove(id);
    expect(userService.remove).toHaveBeenCalledWith(+id);
  });
});
