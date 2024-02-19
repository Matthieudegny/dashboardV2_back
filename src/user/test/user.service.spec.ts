import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { UserService } from '../user.service';
import { UserDto } from '../dto/user.dto';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm';

const userDto = new UserDto();
const user = new User();

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
    jest.spyOn(repo, 'create').mockReturnValue(user);
    jest.spyOn(repo, 'save').mockResolvedValue(user);

    expect(await service.create(userDto)).toEqual(user);
    expect(repo.create).toHaveBeenCalledWith(userDto);
    expect(repo.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users: User[] = [user, user, user];

    jest.spyOn(repo, 'find').mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
    expect(repo.find).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const id = 1;
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);

    expect(await service.findOne(id)).toEqual(user);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { idUser: id } });
  });

  it('should update a user', async () => {
    const id = 1;
    const result: UpdateResult = { raw: [], affected: 1, generatedMaps: [] };
    jest.spyOn(repo, 'update').mockResolvedValue(result as UpdateResult);

    expect(await service.updateUser(id, userDto)).toEqual(result);
    expect(repo.update).toHaveBeenCalledWith(id, userDto);
  });

  it('should remove a user', async () => {
    const id = 1;
    const result: DeleteResult = { raw: [], affected: 1 };

    jest.spyOn(repo, 'delete').mockResolvedValue(result as DeleteResult);

    expect(await service.remove(id)).toEqual(result);
    expect(repo.delete).toHaveBeenCalledWith(id);
  });
});
