import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'First name of the customer', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the customer', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address of the customer', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Primary phone number of the customer', example: '11999999999' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  phone: string;

  @ApiProperty({ description: 'Secondary/alternative phone number of the customer', example: '11988888888' })
  @IsString()
  @IsNotEmpty()
  secondaryPhone: string;

  @ApiPropertyOptional({ description: 'Street name', example: 'Av. Paulista' })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({ description: 'Street number', example: '1000' })
  @IsString()
  @IsOptional()
  number?: string;

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

  @ApiPropertyOptional({ description: 'ZIP/Postal code', example: '01310-100' })
  @IsString()
  @IsOptional()
  @Length(8, 10)
  zipCode?: string;

  @ApiProperty({ description: 'Birth date of the customer', example: '1990-01-01', format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ description: 'CPF (Brazilian tax ID) - 11 digits', example: '12345678901' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;

  @ApiPropertyOptional({ description: 'RG (Brazilian identity card)', example: '123456789' })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  rg?: string;

  @ApiProperty({ description: 'Gender of the customer', example: 'Male' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: 'Naturality (place of birth)', example: 'São Paulo - SP' })
  @IsString()
  @IsNotEmpty()
  naturality: string;

  @ApiProperty({ description: 'Observations or notes about the customer', example: 'Preferred contact time: afternoon.' })
  @IsString()
  @IsNotEmpty()
  observations: string;
}
