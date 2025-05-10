import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IdDto } from './common.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class UserDto extends IdDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @Type(() => String)
  readonly login: string;

  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  readonly first: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly last?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly second?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @Type(() => String)
  readonly phone?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  readonly news?: boolean;

  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  readonly role: string;
}

export class UserCreateDto extends OmitType(UserDto, ['id']) {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Type(() => String)
  readonly password: string;
}

export class UserUpdateDto extends PartialType(
  OmitType(UserDto, ['id', 'login']),
) {}

export class UserLoginRequestDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @Type(() => String)
  readonly login: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @Type(() => String)
  readonly password: string;
}

export class UserLoginResponseDto extends IdDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  readonly token!: string;
}

export class UserPasswordDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Type(() => String)
  readonly password: string;
}
