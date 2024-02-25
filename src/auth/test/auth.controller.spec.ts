import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dto/Login.dto';
import { UserDto } from '../../user/dto/user.dto';

const loginDto = new LoginDto();
const signUpDto = new UserDto();

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  const mockAuthService = {
    findByLogin: jest.fn(),
  };

  const mockUserService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should call authService.findByLogin when login is called', async () => {
    await authController.login(loginDto);
    expect(mockAuthService.findByLogin).toHaveBeenCalledWith(loginDto);
  });

  it('should call userService.create when create is called', async () => {
    await authController.create(signUpDto);
    expect(mockUserService.create).toHaveBeenCalledWith(signUpDto);
  });
});
