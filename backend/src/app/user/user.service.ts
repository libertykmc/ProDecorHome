import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  UserCreateDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UserMapper } from 'src/mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  private get manager() {
    return this.dataSource.manager;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  update(id: string, user: UserEntity) {
    return this.userRepository.update(id, user);
  }

  createUser(name: string, surname: string, login: string, password: string) {
    const user = this.userRepository.create({ name, surname, login, password });
    return this.userRepository.save(user);
  }

  async register(dto: UserCreateDto): Promise<UserDto> {
    const login = String(dto.login).toLowerCase();

    const existingUserEntity = await this.manager.findOneBy(UserEntity, {
      login: ILike(login),
    });

    if (existingUserEntity) {
      throw new UnprocessableEntityException(
        'Пользователь с таким логином уже существует',
      );
    }

    const userEntity = this.manager.create(UserEntity, {
      ...dto,
      id: randomUUID(),
      login: login,
      password: dto.password,
    });

    const user = await this.manager.save(userEntity);

    return UserMapper.toDto(user);
  }

  async generateToken(dto: UserDto): Promise<UserLoginResponseDto> {
    const token = await this.jwtService.signAsync({
      login: dto.login,
      role: dto.role,
    });
    return { id: dto.id, token: token };
  }

  async login(dto: UserLoginRequestDto) {
    const login = dto.login.trim().toLowerCase();

    const userEntity = await this.manager.findOneBy(UserEntity, {
      login: ILike(login),
    });

    if (!userEntity) {
      throw new UnprocessableEntityException(
        'Пользователь с таким логином не найден',
      );
    }

    if (userEntity.password !== dto.password) {
      throw new UnprocessableEntityException('Неверный пароль');
    }

    return UserMapper.toDto(userEntity);
  }
}
