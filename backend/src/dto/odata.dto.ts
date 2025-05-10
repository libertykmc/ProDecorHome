import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class ODataRequestDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly $filter?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly $orderby?: string;

  @ApiPropertyOptional({ type: Number, default: 100 })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  readonly $top?: number;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  readonly $skip?: number;
}

export type ODataQuery = {
  $count?: boolean;
  $filter?: string;
  $orderby?: string;
  $select?: string;
  $skip?: number;
  $top?: number;
};

export interface Count {
  count: number;
}
