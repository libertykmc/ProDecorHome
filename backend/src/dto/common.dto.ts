import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly id!: string;
}

export class UserIdDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly user_id!: string;
}
