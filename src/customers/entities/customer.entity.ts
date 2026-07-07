import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('customers')
export class Customer {
  @ApiProperty({ description: 'The unique identifier (UUID) of the customer', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'First name of the customer', example: 'John' })
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @ApiProperty({ description: 'Last name of the customer', example: 'Doe' })
  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @ApiProperty({ description: 'Email address of the customer', example: 'john.doe@example.com' })
  @Column()
  email: string;

  @ApiProperty({ description: 'Primary phone number of the customer', example: '11999999999' })
  @Column({ length: 20 })
  phone: string;

  @ApiProperty({ description: 'Secondary/alternative phone number of the customer', example: '11988888888' })
  @Column()
  secondaryPhone: string;

  @ApiPropertyOptional({ description: 'Street name', example: 'Av. Paulista' })
  @Column({ nullable: true })
  street?: string;

  @ApiPropertyOptional({ description: 'Street number', example: '1000' })
  @Column({ nullable: true })
  number?: string;

  @ApiPropertyOptional({ description: 'Neighborhood', example: 'Bela Vista' })
  @Column({ nullable: true })
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'Address complement', example: 'Apt 101' })
  @Column({ nullable: true })
  complement?: string;

  @ApiPropertyOptional({ description: 'City name', example: 'São Paulo' })
  @Column({ nullable: true })
  city?: string;

  @ApiPropertyOptional({ description: 'State abbreviation or name', example: 'SP', default: 'Bahia' })
  @Column({ default: 'Bahia', nullable: true })
  state?: string;

  @ApiPropertyOptional({ description: 'ZIP/Postal code', example: '01310-100' })
  @Column({ name: 'zip_code', length: 10, nullable: true })
  zipCode?: string;

  @ApiProperty({ description: 'Birth date of the customer', example: '1990-01-01', type: String, format: 'date' })
  @Column({ name: 'birth_date', type: 'date' })
  birthDate!: Date;

  @ApiProperty({ description: 'CPF (Brazilian tax ID) - 11 digits', example: '12345678901' })
  @Column({ unique: true, length: 11 })
  cpf!: string;

  @ApiPropertyOptional({ description: 'RG (Brazilian identity card)', example: '123456789' })
  @Column({ length: 20, nullable: true })
  rg?: string;

  @ApiProperty({ description: 'Gender of the customer', example: 'Male' })
  @Column()
  gender: string;

  @ApiProperty({ description: 'Naturality (place of birth)', example: 'São Paulo - SP' })
  @Column()
  naturality: string;

  @ApiProperty({ description: 'Observations or notes about the customer', example: 'Preferred contact time: afternoon.' })
  @Column()
  observations: string;
}
