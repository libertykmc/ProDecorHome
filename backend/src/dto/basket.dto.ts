import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FavoritesAndOrderRequestDto } from './favorites.dto';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class BasketRequestDto extends FavoritesAndOrderRequestDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;
}

export class BasketQuantityDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;
}

export class BasketGetRequestDto extends OmitType(BasketRequestDto, [
  'quantity',
]) {}

export class BasketDto extends BasketRequestDto {
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
