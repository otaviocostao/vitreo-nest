import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Customer } from '../../customers/entities/customer.entity';
import { Prescription } from '../../prescriptions/entities/prescription.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';

@Entity('orders')
export class Order {
  @ApiProperty({ description: 'The unique identifier (UUID) of the order', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The customer who placed the order' })
  @ManyToOne(() => Customer, { nullable: false, eager: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ApiPropertyOptional({ description: 'The prescription associated with the order' })
  @ManyToOne(() => Prescription, { cascade: ['insert', 'update'], nullable: true, eager: false })
  @JoinColumn({ name: 'prescription_id' })
  prescription?: Prescription | null;

  @ApiProperty({ description: 'List of items in the order', type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, orphanedRowAction: 'delete' })
  items: OrderItem[];

  @ApiPropertyOptional({ description: 'Service Order number', example: 10045 })
  @Column('integer', { name: 'service_order', nullable: true })
  serviceOrder?: number;

  @ApiProperty({ description: 'Order creation date and time', example: '2026-05-30T15:30:00Z' })
  @Column('timestamp', { name: 'order_date', nullable: false })
  orderDate: Date;

  @ApiPropertyOptional({ description: 'Estimated delivery date', example: '2026-06-05', type: String, format: 'date' })
  @Column('date', { name: 'delivery_forecast_date', nullable: true })
  deliveryForecastDate?: Date;

  @ApiPropertyOptional({ description: 'Actual delivery date', example: '2026-06-04', type: String, format: 'date' })
  @Column('date', { name: 'delivery_date', nullable: true })
  deliveryDate?: Date;

  @ApiPropertyOptional({ description: 'Value of the frames', example: 150.00 })
  @Column('decimal', { name: 'frame_value', precision: 10, scale: 2, nullable: true })
  frameValue?: number;

  @ApiPropertyOptional({ description: 'Value of the lenses', example: 300.00 })
  @Column('decimal', { name: 'lens_value', precision: 10, scale: 2, nullable: true })
  lensValue?: number;

  @ApiProperty({ description: 'Total value before discounts', example: 450.00, default: 0 })
  @Column('decimal', { name: 'total_value', precision: 10, scale: 2, default: 0 })
  totalValue: number;

  @ApiProperty({ description: 'Final value after discounts', example: 400.00, default: 0 })
  @Column('decimal', { name: 'final_value', precision: 10, scale: 2, default: 0 })
  finalValue: number;

  @ApiProperty({ description: 'Discount applied to the order', example: 50.00, default: 0 })
  @Column('decimal', { name: 'discount', precision: 10, scale: 2, default: 0, nullable: false })
  discount: number;

  @ApiProperty({ description: 'List of payments made for the order', type: () => [Payment] })
  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true, orphanedRowAction: 'delete' })
  payments: Payment[];

  @ApiProperty({ description: 'Status of the order', enum: OrderStatus, example: OrderStatus.PENDING })
  @Column('varchar', { name: 'status', nullable: false })
  status: OrderStatus;

  @ApiPropertyOptional({ description: 'Observations/Notes about the order', example: 'Special anti-reflex coating requested.' })
  @Column('text', { name: 'observations', nullable: true })
  observations?: string;
}
