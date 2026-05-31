import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('prescriptions')
export class Prescription {
  @ApiProperty({ description: 'The unique identifier (UUID) of the prescription', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The customer associated with this prescription' })
  @ManyToOne(() => Customer, { nullable: false, eager: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ApiPropertyOptional({ description: 'OD Spherical value', example: 2.25 })
  @Column('decimal', { name: 'spherical_od', precision: 4, scale: 2, nullable: true })
  sphericalOd?: number;

  @ApiPropertyOptional({ description: 'OD Cylindrical value', example: -1.50 })
  @Column('decimal', { name: 'cylindrical_od', precision: 4, scale: 2, nullable: true })
  cylindricalOd?: number;

  @ApiPropertyOptional({ description: 'OD Axis value', example: 180 })
  @Column('integer', { name: 'axis_od', nullable: true })
  axisOd?: number;

  @ApiPropertyOptional({ description: 'OE Spherical value', example: 1.75 })
  @Column('decimal', { name: 'spherical_oe', precision: 4, scale: 2, nullable: true })
  sphericalOe?: number;

  @ApiPropertyOptional({ description: 'OE Cylindrical value', example: -0.75 })
  @Column('decimal', { name: 'cylindrical_oe', precision: 4, scale: 2, nullable: true })
  cylindricalOe?: number;

  @ApiPropertyOptional({ description: 'OE Axis value', example: 90 })
  @Column('integer', { name: 'axis_oe', nullable: true })
  axisOe?: number;

  @ApiPropertyOptional({ description: 'Addition value', example: 2.00 })
  @Column('decimal', { name: 'addition', precision: 4, scale: 2, nullable: true })
  addition?: number;

  @ApiPropertyOptional({ description: 'Pupillary distance', example: 62.5 })
  @Column('decimal', { name: 'pupillary_distance', precision: 4, scale: 2, nullable: true })
  pupillaryDistance?: number;

  @ApiPropertyOptional({ description: 'OD DNP value', example: 31.00 })
  @Column('decimal', { name: 'dnp_od', precision: 5, scale: 2, nullable: true })
  dnpOd?: number;

  @ApiPropertyOptional({ description: 'OE DNP value', example: 31.50 })
  @Column('decimal', { name: 'dnp_oe', precision: 5, scale: 2, nullable: true })
  dnpOe?: number;

  @ApiPropertyOptional({ description: 'OD Optical Center', example: 12.00 })
  @Column('decimal', { name: 'optical_center_od', precision: 5, scale: 2, nullable: true })
  opticalCenterOd?: number;

  @ApiPropertyOptional({ description: 'OE Optical Center', example: 12.50 })
  @Column('decimal', { name: 'optical_center_oe', precision: 5, scale: 2, nullable: true })
  opticalCenterOe?: number;

  @ApiPropertyOptional({ description: 'Highest/Greater Angle', example: 10.00 })
  @Column('decimal', { name: 'greater_angle', precision: 5, scale: 2, nullable: true })
  greaterAngle?: number;

  @ApiPropertyOptional({ description: 'Bridge Frame size', example: 18.00 })
  @Column('decimal', { name: 'bridge_frame', precision: 5, scale: 2, nullable: true })
  bridgeFrame?: number;

  @ApiPropertyOptional({ description: 'Vertical Angle', example: 15.00 })
  @Column('decimal', { name: 'vertical_angle', precision: 5, scale: 2, nullable: true })
  verticalAngle?: number;

  @ApiPropertyOptional({ description: 'Doctor name', example: 'Dr. Smith' })
  @Column({ name: 'doctor_name', length: 255, nullable: true })
  doctorName?: string;

  @ApiPropertyOptional({ description: 'Doctor CRM registration number', example: '123456-SP' })
  @Column({ name: 'doctor_crm', length: 50, nullable: true })
  doctorCrm?: string;

  @ApiPropertyOptional({ description: 'Date of prescription', example: '2026-05-30', type: String, format: 'date' })
  @Column({ name: 'prescription_date', type: 'date', nullable: true })
  prescriptionDate?: Date;

  @ApiProperty({ description: 'Date when the prescription was registered in system', example: '2026-05-30' })
  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt: Date;
}
