import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsIn, IsUUID, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FrameMaterial } from '../enums/frame-material.enum';
import { LensMaterial } from '../enums/lens-material.enum';
import { LensType } from '../enums/lens-type.enum';

export class CreateProductDto {
  @ApiProperty({ description: 'The type of product', enum: ['lens', 'frame'], example: 'lens' })
  @IsIn(['lens', 'frame'])
  @IsNotEmpty()
  productType: 'lens' | 'frame';

  @ApiProperty({ description: 'The ID of the supplier', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  supplierId: string;

  @ApiProperty({ description: 'The name of the product', example: 'Premium Anti-Reflexive Lens' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'The internal reference code of the product', example: 'LNS-001' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ description: 'The ID of the brand', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({ description: 'The barcode of the product', example: '7891234567890' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiPropertyOptional({ description: 'The purchase cost of the product', example: 50.00 })
  @IsNumber()
  @IsOptional()
  cost?: number;

  @ApiPropertyOptional({ description: 'The sale price of the product', example: 120.00 })
  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @ApiPropertyOptional({ description: 'The stock quantity of the product', example: 10 })
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @ApiPropertyOptional({ description: 'Indicates if the product is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Lens specific fields
  @ApiPropertyOptional({ description: 'The material of the lens (required for type lens)', enum: LensMaterial, example: LensMaterial.POLICARBONATO })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEnum(LensMaterial)
  @IsOptional()
  lensMaterial?: LensMaterial;

  @ApiPropertyOptional({ description: 'The treatment applied to the lens (optional for type lens)', example: 'Anti-glare' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @IsOptional()
  treatment?: string;

  @ApiPropertyOptional({ description: 'The type of lens (optional for type lens)', enum: LensType, example: LensType.VISAO_SIMPLES })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEnum(LensType)
  @IsOptional()
  lensType?: LensType;

  // Frame specific fields
  @ApiPropertyOptional({ description: 'The color of the frame (optional for type frame)', example: 'Matte Black' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'The material of the frame (optional for type frame)', enum: FrameMaterial, example: FrameMaterial.ACETATO })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEnum(FrameMaterial)
  @IsOptional()
  material?: FrameMaterial;

  @ApiPropertyOptional({ description: 'The size of the frame (optional for type frame)', example: '54-18-140' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsString()
  @IsOptional()
  size?: string;
}
