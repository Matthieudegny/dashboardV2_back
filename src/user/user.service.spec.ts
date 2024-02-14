import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/User';

describe('UserService', () => {
  let service: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User],
    }).compile();

    service = module.get<User>(User);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
