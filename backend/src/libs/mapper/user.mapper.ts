import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/models/user.entity';

export class MapperUser {
  static toDto(u: UserEntity): UserDto {
    return {
      id: u.id,
      login: u.login,
      first: u.first,
      last: u.last,
      second: u.second,
      phone: u.phone,
      news: u.news,
      role: u.role,
    };
  }

  static toDtos(users: UserEntity[]): UserDto[] {
    return users.map((u) => MapperUser.toDto(u));
  }
}
