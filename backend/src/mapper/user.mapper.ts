import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/app/user/entities/user.entity';

export class UserMapper {
  static toDto(user: UserEntity): UserDto {
    return {
      id: user.id,
      login: user.login,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };
  }
}
