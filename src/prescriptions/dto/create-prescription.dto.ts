import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty({ description: 'The UUID of the customer associated with this prescription', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiPropertyOptional({ description: 'OD Spherical value', example: 2.25 })
  @IsNumber()
  @IsOptional()
  sphericalOd?: number;

  @ApiPropertyOptional({ description: 'OD Cylindrical value', example: -1.50 })
  @IsNumber()
  @IsOptional()
  cylindricalOd?: number;

  @ApiPropertyOptional({ description: 'OD Axis value', example: 180 })
  @IsNumber()
  @IsOptional()
  axisOd?: number;

  @ApiPropertyOptional({ description: 'OE Spherical value', example: 1.75 })
  @IsNumber()
  @IsOptional()
  sphericalOe?: number;

  @ApiPropertyOptional({ description: 'OE Cylindrical value', example: -0.75 })
  @IsNumber()
  @IsOptional()
  cylindricalOe?: number;

  @ApiPropertyOptional({ description: 'OE Axis value', example: 90 })
  @IsNumber()
  @IsOptional()
  axisOe?: number;

  @ApiPropertyOptional({ description: 'Addition value', example: 2.00 })
  @IsNumber()
  @IsOptional()
  addition?: number;

  @ApiPropertyOptional({ description: 'Pupillary distance', example: 62.5 })
  @IsNumber()
  @IsOptional()
  pupillaryDistance?: number;

  @ApiPropertyOptional({ description: 'OD DNP value', example: 31.00 })
  @IsNumber()
  @IsOptional()
  dnpOd?: number;

  @ApiPropertyOptional({ description: 'OE DNP value', example: 31.50 })
  @IsNumber()
  @IsOptional()
  dnpOe?: number;

  @ApiPropertyOptional({ description: 'OD Optical Center', example: 12.00 })
  @IsNumber()
  @IsOptional()
  opticalCenterOd?: number;

  @ApiPropertyOptional({ description: 'OE Optical Center', example: 12.50 })
  @IsNumber()
  @IsOptional()
  opticalCenterOe?: number;

  @ApiPropertyOptional({ description: 'Highest/Greater Angle', example: 10.00 })
  @IsNumber()
  @IsOptional()
  greaterAngle?: number;

  @ApiPropertyOptional({ description: 'Bridge Frame size', example: 18.00 })
  @IsNumber()
  @IsOptional()
  bridgeFrame?: number;

  @ApiPropertyOptional({ description: 'Vertical Angle', example: 15.00 })
  @IsNumber()
  @IsOptional()
  verticalAngle?: number;

  @ApiPropertyOptional({ description: 'Doctor name', example: 'Dr. Smith' })
  @IsString()
  @IsOptional()
  doctorName?: string;

  @ApiPropertyOptional({ description: 'Doctor CRM registration number', example: '123456-SP' })
  @IsString()
  @IsOptional()
  doctorCrm?: string;

  @ApiPropertyOptional({ description: 'Date of prescription', example: '2026-05-30', type: String, format: 'date' })
  @IsDateString()
  @IsOptional()
  prescriptionDate?: string;
}
