import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Values } from 'src/models/order.entity';

export class FavoritesRequestDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly user_id!: string;
}

export class FavoritesAndOrderRequestDto extends FavoritesRequestDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly product_id!: string;
}

export class FavoritesDto extends FavoritesAndOrderRequestDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly id!: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly title: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly discount: number;
}

export class OrderProductDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly id!: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly title: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly discount: number;
}

export class OrderDto {
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

  @ApiProperty({ type: Values })
  @Type(() => Values)
  readonly values: Values;

  @ApiProperty({ type: String, isArray: true })
  @IsUUID(4)
  @Type(() => String)
  readonly product_ids: string[];
}
