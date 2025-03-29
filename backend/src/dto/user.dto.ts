import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IdDto } from './common.dto';
import { UserRole } from 'src/app/user/entities/user.entity';

export class UserDto extends IdDto {
  @ApiProperty({ type: String })
  @Type(() => String)
  readonly login!: string;

  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  readonly name: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly surname?: string;

  @ApiProperty({ type: String })
  @IsEnum(UserRole)
  @IsString()
  @Type(() => String)
  readonly role: UserRole;
}

export class UserCreateDto extends OmitType(UserDto, ['id']) {
  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  readonly password: string;
}

export class UserLoginResponseDto extends IdDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  readonly token!: string;
}

export class UserLoginRequestDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @Type(() => String)
  readonly login: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @Type(() => String)
  readonly password: string;
}
