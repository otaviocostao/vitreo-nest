import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({ description: 'The customer has been successfully created.', type: Customer })
  @ApiConflictResponse({ description: 'Email or CPF already exists.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiOkResponse({ description: 'List of all customers.', type: [Customer] })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'The customer ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The customer details.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiParam({ name: 'id', description: 'The customer ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The customer has been successfully updated.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @ApiConflictResponse({ description: 'Email or CPF already exists.' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Patch(':id/active')
  @ApiOperation({ summary: 'Update customer active status' })
  @ApiParam({ name: 'id', description: 'The customer ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The customer status has been successfully updated.', type: Customer })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  updateActive(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.customersService.updateActive(id, isActive);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', description: 'The customer ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The customer has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
