import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from './order.entity';
import { PaymentMethod } from '../enums/payment-method.enum';

@Entity('payments')
export class Payment {
  @ApiProperty({ description: 'The unique identifier (UUID) of the payment', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ApiProperty({ description: 'The payment method used', enum: PaymentMethod, example: PaymentMethod.CREDIT_CARD })
  @Column('varchar', { name: 'payment_method', nullable: false })
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: 'Amount paid in this transaction', example: 100.00 })
  @Column('decimal', { name: 'amount_paid', precision: 10, scale: 2 })
  amountPaid: number;

  @ApiProperty({ description: 'Number of installments', example: 3, default: 1 })
  @Column('integer', { name: 'installments', default: 1 })
  installments: number;

  @ApiProperty({ description: 'Date and time when the payment was registered', example: '2026-05-30T17:28:45Z' })
  @CreateDateColumn({ name: 'payment_date', type: 'timestamp' })
  paymentDate: Date;
}
