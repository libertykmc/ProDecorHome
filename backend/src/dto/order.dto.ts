import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { Values } from 'src/models/order.entity';

export class CreateOrderDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly id!: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly user_id!: string;

  @ApiProperty({ type: String, format: 'uuid', isArray: true })
  @IsArray()
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly product_ids!: string[];

  @ApiProperty({ type: Values })
  @Type(() => Values)
  readonly values: Values;

  @ApiProperty({ type: Date })
  create_at: Date;

  @ApiProperty({ type: Date, nullable: true })
  @IsOptional()
  receipt_at: Date;
}
