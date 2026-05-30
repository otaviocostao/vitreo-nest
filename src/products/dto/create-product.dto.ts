import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsIn, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ description: 'The ID of the brand', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({ description: 'The barcode of the product', example: '7891234567890' })
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiPropertyOptional({ description: 'The purchase cost of the product', example: 50.00 })
  @IsNumber()
  @IsOptional()
  cost?: number;

  @ApiPropertyOptional({ description: 'The sale price of the product', example: 120.00 })
  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @ApiPropertyOptional({ description: 'The stock quantity of the product', example: 10 })
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @ApiPropertyOptional({ description: 'Indicates if the product is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // Lens specific fields
  @ApiPropertyOptional({ description: 'The material of the lens (required for type lens)', example: 'Polycarbonate' })
  @IsString()
  @IsOptional()
  lensMaterial?: string;

  @ApiPropertyOptional({ description: 'The treatment applied to the lens (optional for type lens)', example: 'Anti-glare' })
  @IsString()
  @IsOptional()
  treatment?: string;

  @ApiPropertyOptional({ description: 'The type of lens (optional for type lens)', example: 'Single Vision' })
  @IsString()
  @IsOptional()
  lensType?: string;

  // Frame specific fields
  @ApiPropertyOptional({ description: 'The color of the frame (optional for type frame)', example: 'Matte Black' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'The material of the frame (optional for type frame)', example: 'Acetate' })
  @IsString()
  @IsOptional()
  material?: string;

  @ApiPropertyOptional({ description: 'The size of the frame (optional for type frame)', example: '54-18-140' })
  @IsString()
  @IsOptional()
  size?: string;
}
