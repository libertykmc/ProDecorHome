import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsEnum, IsArray } from 'class-validator';
import { ProductType } from 'src/enum/product.type';
import { string } from 'yargs';

export class ProductQueryDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID(4)
  @Expose()
  @Type(() => String)
  readonly product_id!: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly product_title: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Type(() => String)
  readonly product_description: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly product_price: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  readonly product_discount: number;

  @ApiProperty({ enum: ProductType })
  @IsEnum(ProductType)
  readonly product_type: ProductType;

  @ApiProperty({ type: string, isArray: true })
  @IsArray()
  readonly product_images: string[];
}
