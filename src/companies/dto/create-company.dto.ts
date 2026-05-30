import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Corporate name of the company', example: 'Vitreo Corp S/A' })
  @IsString()
  @IsNotEmpty()
  corporateName: string;

  @ApiPropertyOptional({ description: 'Trade/Fantasy name of the company', example: 'Vitreo' })
  @IsString()
  @IsOptional()
  tradeName?: string;

  @ApiProperty({ description: 'CNPJ (Brazilian company tax ID) - 14 digits', example: '12345678000199' })
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
  mobilePhone?: string;

  @ApiPropertyOptional({ description: 'Landline phone number', example: '1133333333' })
  @IsString()
  @IsOptional()
  landlinePhone?: string;

  @ApiPropertyOptional({ description: 'Contact email address of the company', example: 'contact@vitreo.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'URL pointing to the company logo', example: 'https://vitreo.com/logo.png' })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Street name of company location', example: 'Av. Paulista' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({ description: 'Street number of company location', example: '1000' })
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
  @Length(8, 8)
  zipCode?: string;
}
