import { ProductType } from 'src/enum/product.type';
import { IdDto } from './common.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProductDto extends IdDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly title: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly description: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly discount: number;

  @ApiProperty({ enum: ProductType })
  @IsEnum(ProductType)
  readonly type: ProductType;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsOptional()
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly favorites_id?: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  readonly images?: string[];
}

export class ProductImageDto {
  @ApiProperty({ type: String })
  @IsString()
  image: string;
}

export class ProductImageRequestDto extends ProductImageDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly product_id: string;
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) {}
