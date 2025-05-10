import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { UserCreateDto, UserDto, UserLoginRequestDto } from 'src/dto/user.dto';
import { MapperUser } from 'src/libs/mapper/user.mapper';
import * as passwordUtils from 'src/libs/password';

// Моки
const mockManager = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
const mockDataSource = {
  manager: mockManager,
};
const mockJwtService = {
  signAsync: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DataSource, useValue: mockDataSource },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('должен зарегистрировать нового пользователя', async () => {
      const dto: UserCreateDto = {
        login: 'test@example.com',
        password: '123456',
        first: 'Test',
        last: 'User',
        second: '',
        phone: '',
        news: false,
        role: 'user',
      };

      mockManager.findOneBy.mockResolvedValue(null); // пользователя нет
      mockManager.create.mockReturnValue({
        ...dto,
        id: 'uuid',
        password: { hash: 'h', salt: 's', digest: 'sha512' },
      });
      mockManager.save.mockResolvedValue({ ...dto, id: 'uuid' });

      const expected: UserDto = {
        ...dto,
        id: 'uuid',
      };

      jest.spyOn(MapperUser, 'toDto').mockReturnValue(expected);

      const result = await service.register(dto);

      expect(result).toEqual(expected);
      expect(mockManager.findOneBy).toHaveBeenCalled();
      expect(mockManager.create).toHaveBeenCalled();
      expect(mockManager.save).toHaveBeenCalled();
    });

    it('должен выбросить ошибку, если пользователь уже существует', async () => {
      mockManager.findOneBy.mockResolvedValue({ id: 'existing-id' });

      await expect(
        service.register({
          login: 'existing@example.com',
          password: '123456',
          first: 'Test',
          last: '',
          second: '',
          phone: '',
          news: false,
          role: 'user',
        }),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('login', () => {
    it('должен авторизовать пользователя с правильным паролем', async () => {
      const dto: UserLoginRequestDto = {
        login: 'user@example.com',
        password: 'correct_password',
      };

      const userEntity = {
        id: 'uuid',
        login: 'user@example.com',
        first: 'Test',
        last: '',
        second: '',
        phone: '',
        news: false,
        role: 'user',
        password: {
          hash: 'hashed_password',
          salt: 'salt123',
          digest: 'sha512',
        },
      };

      mockManager.findOneBy.mockResolvedValue(userEntity);
      jest.spyOn(passwordUtils, 'passwordCompare').mockReturnValue(true);

      const expected: UserDto = {
        id: userEntity.id,
        login: userEntity.login,
        first: userEntity.first,
        last: userEntity.last,
        second: userEntity.second,
        phone: userEntity.phone,
        news: userEntity.news,
        role: userEntity.role,
      };

      jest.spyOn(MapperUser, 'toDto').mockReturnValue(expected);

      const result = await service.login(dto);

      expect(result).toEqual(expected);
    });

    it('должен выбросить ошибку, если пользователь не найден', async () => {
      mockManager.findOneBy.mockResolvedValue(null);

      await expect(
        service.login({
          login: 'notfound@example.com',
          password: 'any',
        }),
      ).rejects.toThrow('User not exists');
    });

    it('должен выбросить ошибку при неверном пароле', async () => {
      const userEntity = {
        id: 'uuid',
        login: 'user@example.com',
        password: {
          hash: 'wrong_hash',
          salt: 'salt123',
          digest: 'sha512',
        },
      };

      mockManager.findOneBy.mockResolvedValue(userEntity);
      jest.spyOn(passwordUtils, 'passwordCompare').mockReturnValue(false);

      await expect(
        service.login({
          login: 'user@example.com',
          password: 'wrong_password',
        }),
      ).rejects.toThrow('User not authrorized');
    });
  });
});
