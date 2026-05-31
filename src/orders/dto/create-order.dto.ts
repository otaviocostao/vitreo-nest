import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, IsEnum, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'The UUID of the product', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of items', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Unit price of the product', example: 150.00 })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}

export class CreatePaymentDto {
  @ApiProperty({ description: 'The payment method used', enum: PaymentMethod, example: PaymentMethod.CREDIT_CARD })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: 'Amount paid in this transaction', example: 100.00 })
  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @ApiPropertyOptional({ description: 'Number of installments', example: 3, default: 1 })
  @IsNumber()
  @IsOptional()
  installments?: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'The UUID of the customer associated with the order', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiPropertyOptional({ description: 'The UUID of the prescription associated with the order', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  prescriptionId?: string;

  @ApiPropertyOptional({ description: 'Service Order number', example: 10045 })
  @IsNumber()
  @IsOptional()
  serviceOrder?: number;

  @ApiProperty({ description: 'Order creation date and time', example: '2026-05-30T15:30:00Z' })
  @IsDateString()
  @IsNotEmpty()
  orderDate: string;

  @ApiPropertyOptional({ description: 'Estimated delivery date', example: '2026-06-05', type: String, format: 'date' })
  @IsDateString()
  @IsOptional()
  deliveryForecastDate?: string;

  @ApiPropertyOptional({ description: 'Actual delivery date', example: '2026-06-04', type: String, format: 'date' })
  @IsDateString()
  @IsOptional()
  deliveryDate?: string;

  @ApiPropertyOptional({ description: 'Value of the frames', example: 150.00 })
  @IsNumber()
  @IsOptional()
  frameValue?: number;

  @ApiPropertyOptional({ description: 'Value of the lenses', example: 300.00 })
  @IsNumber()
  @IsOptional()
  lensValue?: number;

  @ApiPropertyOptional({ description: 'Discount applied to the order', example: 50.00, default: 0 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty({ description: 'Status of the order', enum: OrderStatus, example: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @ApiPropertyOptional({ description: 'Observations/Notes about the order', example: 'Special anti-reflex coating requested.' })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty({ description: 'List of items in the order', type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiPropertyOptional({ description: 'List of payments made for the order', type: [CreatePaymentDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  payments?: CreatePaymentDto[];
}
