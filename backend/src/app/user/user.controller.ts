import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { EmailValidationPipe } from 'src/validation/email';
import { UserCreateDto, UserLoginRequestDto } from 'src/dto/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiParam({ name: 'id', required: true, description: 'Id пользователя' })
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiParam({ name: 'id', required: true, description: 'Id пользователя' })
  @ApiBody({
    schema: { example: { name: '', surname: '', login: '', password: '' } },
  })
  updateUser(@Param('id') id: string, @Body() user: UserEntity) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', required: true, description: 'Id пользователя' })
  removeUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('register')
  @UsePipes(EmailValidationPipe)
  async authRegister(@Body() dto: UserCreateDto) {
    const user = await this.userService.register(dto);
    return this.userService.generateToken(user);
  }

  @Post('login')
  async authLogin(@Body() dto: UserLoginRequestDto) {
    const user = await this.userService.login(dto);
    return this.userService.generateToken(user);
  }
}
