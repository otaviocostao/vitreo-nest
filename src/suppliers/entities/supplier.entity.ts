import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Brand } from 'src/brands/entities/brand.entity';

@Entity('suppliers')
export class Supplier {
  @ApiProperty({ description: 'The unique identifier (UUID) of the supplier', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Corporate name of the supplier', example: 'Vitreo Corp S/A' })
  @Column({ name: 'corporate_name', nullable: false })
  corporateName: string;

  @ApiPropertyOptional({ description: 'Trade/Fantasy name of the supplier', example: 'Vitreo' })
  @Column({ name: 'trade_name', nullable: true })
  tradeName?: string;

  @ApiProperty({ description: 'CNPJ (Brazilian supplier tax ID) - 14 digits', example: '12345678000199' })
  @Column({ unique: true, length: 14, nullable: false })
  cnpj: string;

  @ApiPropertyOptional({ description: 'State Registration (Inscrição Estadual)', example: '123456789' })
  @Column({ name: 'state_registration', nullable: true })
  stateRegistration?: string;

  @ApiPropertyOptional({ description: 'Mobile/Cell phone number', example: '11999999999' })
  @Column({ name: 'cell_phone', nullable: true })
  cellPhone?: string;

  @ApiPropertyOptional({ description: 'Landline phone number', example: '1133333333' })
  @Column({ nullable: true })
  phone?: string;

  @ApiPropertyOptional({ description: 'Contact email address of the supplier', example: 'contact@vitreo.com' })
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ description: 'URL pointing to the supplier logo', example: 'https://vitreo.com/logo.png' })
  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'Street name of supplier location', example: 'Av. Paulista' })
  @Column({ nullable: true })
  street?: string;

  @ApiPropertyOptional({ description: 'Street number of supplier location', example: '1000' })
  @Column({ nullable: true })
  number?: string;

  @ApiPropertyOptional({ description: 'Address complement', example: 'Apt 101' })
  @Column({ nullable: true })
  complement?: string;

  @ApiPropertyOptional({ description: 'Neighborhood', example: 'Bela Vista' })
  @Column({ nullable: true })
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'City name', example: 'São Paulo' })
  @Column({ nullable: true })
  city?: string;

  @ApiPropertyOptional({ description: 'State abbreviation or name', example: 'SP', default: 'Bahia' })
  @Column({ default: 'Bahia', nullable: true })
  state?: string;

  @ApiPropertyOptional({ description: 'ZIP/Postal code - 8 digits', example: '01310100' })
  @Column({ name: 'zip_code', length: 8, nullable: true })
  zipCode?: string;

  @OneToMany(() => Brand, (brand) => brand.supplier, { nullable: true, eager: false })
  brands?: Brand[];

  @ApiProperty({ description: 'Indicates if the supplier is active', default: true })
  @Column({ name: 'is_active', default: true, nullable: false })
  isActive: boolean;
}
