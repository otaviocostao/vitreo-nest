import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Brand } from '../../brands/entities/brand.entity';

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'product_type' } })
export abstract class Product {
  @ApiProperty({ description: 'The unique identifier (UUID) of the product', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The type of product', example: 'lens' })
  @Column({ name: 'product_type', type: 'varchar', insert: false, update: false })
  productType: string;

  @ApiProperty({ description: 'The name of the product', example: 'Premium Anti-Reflexive Lens' })
  @Column({ nullable: false })
  name: string;

  @ApiPropertyOptional({ description: 'The internal reference code of the product', example: 'LNS-001' })
  @Column({ nullable: true })
  reference?: string;

  @ApiPropertyOptional({ description: 'The barcode of the product', example: '7891234567890' })
  @Column({ name: 'barcode', nullable: true })
  barcode?: string;

  @ApiProperty({ description: 'The purchase cost of the product', example: 50.00 })
  @Column('decimal', { name: 'cost', precision: 10, scale: 2, nullable: true })
  cost: number;

  @ApiProperty({ description: 'The sale price of the product', example: 120.00 })
  @Column('decimal', { name: 'sale_price', precision: 10, scale: 2, nullable: true })
  salePrice: number;

  @ApiProperty({ description: 'The stock quantity of the product', example: 10 })
  @Column('integer', { name: 'stock_quantity', nullable: true })
  stockQuantity: number;

  @ApiProperty({ description: 'The supplier of the product' })
  @ManyToOne(() => Supplier, { nullable: false, eager: false })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ApiPropertyOptional({ description: 'The brand of the product' })
  @ManyToOne(() => Brand, { nullable: true, eager: false })
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand;

  @ApiProperty({ description: 'Indicates if the product is active', default: true })
  @Column({ name: 'is_active', default: true, nullable: false })
  isActive: boolean;

  @ApiProperty({ description: 'The profit margin of the product in percent', example: 50.00 })
  @Column('decimal', { name: 'profit_margin', precision: 10, scale: 2, nullable: true })
  profitMargin: number;
}
