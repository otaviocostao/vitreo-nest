import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ description: 'Name of the brand', example: 'Ray-Ban' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The supplier of the brand' })
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @ApiPropertyOptional({ description: 'Indicates if the brand is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
