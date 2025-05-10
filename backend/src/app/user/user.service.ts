import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { IdDto } from 'src/dto/common.dto';
import {
  UserCreateDto,
  UserDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
  UserPasswordDto,
  UserUpdateDto,
} from 'src/dto/user.dto';
import { MapperUser } from 'src/libs/mapper/user.mapper';
import { password, passwordCompare } from 'src/libs/password';
import { UserEntity } from 'src/models/user.entity';
import { DataSource, ILike } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  private get manager() {
    return this.dataSource.manager;
  }

  async getUsers() {
    const users = await this.manager.find(UserEntity);
    return MapperUser.toDtos(users);
  }

  async getUser(dto: IdDto) {
    const userEntity = await this.manager.findOneBy(UserEntity, {
      id: dto.id,
    });

    if (!userEntity) {
      throw new UnprocessableEntityException('User not found');
    }

    return MapperUser.toDto(userEntity);
  }

  async updateUser(dto: UserUpdateDto & IdDto) {
    const userEntity = await this.manager.findOneBy(UserEntity, {
      id: dto.id,
    });

    if (!userEntity) throw new Error('User entity not found');

    const updatedUser: UserEntity = { ...userEntity, ...dto };

    await this.manager.update(
      UserEntity,
      {
        id: dto.id,
      },
      {
        login: updatedUser.login,
        first: updatedUser.first,
        last: updatedUser.last,
        second: updatedUser.second,
        phone: updatedUser.phone,
        news: updatedUser.news,
      },
    );

    return MapperUser.toDto(updatedUser);
  }

  async deleteUser(dto: IdDto) {
    await this.manager.delete(UserEntity, {
      id: dto.id,
    });
  }

  async changePassword(dto: UserPasswordDto & IdDto) {
    await this.manager.update(
      UserEntity,
      {
        id: dto.id,
      },
      { password: password(dto.password, 'sha512') },
    );
  }

  async login(dto: UserLoginRequestDto) {
    const login = dto.login.trim().toLowerCase();

    const userEntity = await this.manager.findOneBy(UserEntity, {
      login: ILike(login),
    });

    if (!userEntity) {
      throw new UnprocessableEntityException('User not exists');
    }

    if (
      !passwordCompare(
        dto.password,
        userEntity.password.hash,
        userEntity.password.salt,
        userEntity.password.digest,
      )
    ) {
      throw new UnprocessableEntityException('User not authrorized');
    }

    return MapperUser.toDto(userEntity);
  }

  async register(dto: UserCreateDto): Promise<UserDto> {
    const login = String(dto.login).toLowerCase();

    const existingUserEntity = await this.manager.findOneBy(UserEntity, {
      login: ILike(login),
    });

    if (existingUserEntity) {
      throw new UnprocessableEntityException('User already exists');
    }

    const userEntity = this.manager.create(UserEntity, {
      ...dto,
      id: randomUUID(),
      login: login,
      password: password(dto.password, 'sha512'),
    });

    const user = await this.manager.save(userEntity);

    return MapperUser.toDto(user);
  }

  async logout() {
    return Promise.resolve();
  }

  async generateToken(dto: UserDto): Promise<UserLoginResponseDto> {
    const token = await this.jwtService.signAsync(
      { login: dto.login },
      { subject: dto.id, secret: process.env.PRIVATE_KEY },
    );

    return {
      id: dto.id,
      token: token,
    };
  }
}
