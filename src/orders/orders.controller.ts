import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({ description: 'The order has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Customer, Prescription or Product not found.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 404, description: 'Order, Customer, Prescription or Product not found.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiNoContentResponse({ description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
