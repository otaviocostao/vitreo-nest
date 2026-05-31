import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @ApiProperty({ description: 'The unique identifier (UUID) of the order item', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ApiProperty({ description: 'The product associated with this item' })
  @ManyToOne(() => Product, { nullable: false, eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty({ description: 'Quantity of products in this item', example: 2 })
  @Column('integer', { name: 'quantity', nullable: false })
  quantity: number;

  @ApiProperty({ description: 'Unit price of the product', example: 150.00 })
  @Column('decimal', { name: 'unit_price', precision: 10, scale: 2, nullable: false })
  unitPrice: number;
}
