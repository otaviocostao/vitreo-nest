import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FilterProductDto {
  @ApiPropertyOptional({ description: 'Search term for name, reference, brand or barcode' })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({ description: 'Product type (lens or frame)', enum: ['lens', 'frame'] })
  @IsOptional()
  @IsString()
  type?: 'lens' | 'frame';

  @ApiPropertyOptional({ description: 'Page number (0-indexed)', default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number = 0;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number = 10;

  @ApiPropertyOptional({ description: 'Sort field and order, e.g. name,asc' })
  @IsOptional()
  @IsString()
  sort?: string;
}
