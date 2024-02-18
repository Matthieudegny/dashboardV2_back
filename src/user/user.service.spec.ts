import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto: UserDto = {
      idUser: 1,
      firstName: 'User',
      lastName: 'USer',
      login: 'UserLogin',
      password: 'UserPassword',
    };
    const user: User = {
      idUser: 1,
      firstName: 'User',
      lastName: 'USer',
      login: 'UserLogin',
      password: 'UserPassword',
    };

    jest.spyOn(repo, 'create').mockReturnValue(user);
    jest.spyOn(repo, 'save').mockResolvedValue(user);

    expect(await service.create(userDto)).toEqual(user);
    expect(repo.create).toHaveBeenCalledWith(userDto);
    expect(repo.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users: User[] = [
      {
        idUser: 1,
        firstName: 'User',
        lastName: 'USer',
        login: 'UserLogin',
        password: 'UserPassword',
      },
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const id = 1;
    const user: User = {
      idUser: 1,
      firstName: 'User',
      lastName: 'USer',
      login: 'UserLogin',
      password: 'UserPassword',
    };

    jest.spyOn(repo, 'findOne').mockResolvedValue(user);

    expect(await service.findOne(id)).toEqual(user);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { idUser: id } });
  });

  it('should update a user', async () => {
    const id = 1;
    const userDto: UserDto = {
      idUser: 1,
      firstName: 'User',
      lastName: 'USer',
      login: 'UserLogin',
      password: 'UserPassword',
    };
    const user: User = {
      idUser: 1,
      firstName: 'User',
      lastName: 'USer',
      login: 'UserLogin',
      password: 'UserPassword',
    };

    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    jest.spyOn(repo, 'create').mockReturnValue(user);
    jest.spyOn(repo, 'save').mockResolvedValue(user);

    expect(await service.update(id, userDto)).toEqual(user);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { idUser: id } });
    expect(repo.create).toHaveBeenCalledWith({ ...user, ...userDto });
    expect(repo.save).toHaveBeenCalledWith(user);
  });

  it('should remove a user', async () => {
    const id = 1;
    const result = { affected: 1 };

    jest.spyOn(repo, 'delete').mockResolvedValue(result as any);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
