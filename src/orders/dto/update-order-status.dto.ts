import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'Status of the order', enum: OrderStatus, example: OrderStatus.DELIVERED })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
