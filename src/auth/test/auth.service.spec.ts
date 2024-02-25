import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/Login.dto';
import { UserDto } from '../../user/dto/user.dto';

const loginDto = new LoginDto();
const userDto = new UserDto();

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token when findByLogin is called with valid credentials', async () => {
    const token = 'testAccessToken';

    mockUserRepository.findOne.mockResolvedValue(userDto);
    mockJwtService.signAsync.mockResolvedValue(token);

    const result = await service.findByLogin(loginDto);

    expect(result).toEqual({ access_token: token });
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { login: loginDto.login },
    });
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: userDto.idUser,
      username: userDto.firstName,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      login: userDto.login,
    });
  });

  it('should throw UnauthorizedException when findByLogin is called with invalid credentials', async () => {
    const user = null;
    mockUserRepository.findOne.mockResolvedValue(user);

    await expect(service.findByLogin(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { login: loginDto.login },
    });
  });
});
