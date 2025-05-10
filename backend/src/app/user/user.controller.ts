import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UserCreateDto,
  UserLoginRequestDto,
  UserPasswordDto,
  UserUpdateDto,
} from 'src/dto/user.dto';
import { IdDto } from 'src/dto/common.dto';
import { EmailValidationPipe } from 'src/validation/email';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param() dto: IdDto) {
    return this.userService.getUser(dto);
  }

  @Put(':id')
  updateUser(@Param() id: IdDto, @Body() dto: UserUpdateDto) {
    return this.userService.updateUser({ ...dto, id: id.id });
  }

  @Put(':id/change-password')
  updateUserPassword(@Param() id: IdDto, @Body() dto: UserPasswordDto) {
    return this.userService.changePassword({
      id: id.id,
      password: dto.password,
    });
  }

  @Delete(':id')
  deleteUser(@Param() id: IdDto) {
    return this.userService.deleteUser(id);
  }

  @Post('login')
  async authLogin(@Body() dto: UserLoginRequestDto) {
    const user = await this.userService.login(dto);
    return this.userService.generateToken(user);
  }

  @Post('register')
  @UsePipes(EmailValidationPipe)
  async authRegister(@Body() dto: UserCreateDto) {
    const user = await this.userService.register(dto);
    return this.userService.generateToken(user);
  }

  @Post('logout')
  authLogout() {
    return this.userService.logout();
  }
}
