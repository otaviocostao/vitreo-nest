import { IsNotEmpty, IsOptional, IsString, IsBoolean, Length, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Corporate name of the supplier', example: 'Vitreo Corp S/A' })
  @IsString()
  @IsNotEmpty()
  corporateName: string;

  @ApiPropertyOptional({ description: 'Trade/Fantasy name of the supplier', example: 'Vitreo' })
  @IsString()
  @IsOptional()
  tradeName?: string;

  @ApiProperty({ description: 'CNPJ (Brazilian supplier tax ID) - 14 digits', example: '12345678000199' })
  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;

  @ApiPropertyOptional({ description: 'State Registration (Inscrição Estadual)', example: '123456789' })
  @IsString()
  @IsOptional()
  stateRegistration?: string;

  @ApiPropertyOptional({ description: 'Mobile/Cell phone number', example: '11999999999' })
  @IsString()
  @IsOptional()
  cellPhone?: string;

  @ApiPropertyOptional({ description: 'Landline phone number', example: '1133333333' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Contact email address of the supplier', example: 'contact@vitreo.com' })
  @IsEmail()
  @Transform(({ value }) => value === '' ? null : value)
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'URL pointing to the supplier logo', example: 'https://vitreo.com/logo.png' })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Street name of supplier location', example: 'Av. Paulista' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({ description: 'Street number of supplier location', example: '1000' })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({ description: 'Address complement', example: 'Apt 101' })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiPropertyOptional({ description: 'Neighborhood', example: 'Bela Vista' })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'City name', example: 'São Paulo' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'State abbreviation or name', example: 'SP' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: 'ZIP/Postal code - 8 digits', example: '01310100' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @Length(8, 8)
  zipCode?: string;

  @ApiPropertyOptional({ description: 'Indicates if the supplier is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
