import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiNoContentResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiBearerAuth()
@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Conflict - Name already exists.' })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all suppliers' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a supplier by id' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a supplier' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  @ApiResponse({ status: 409, description: 'Conflict - Name already exists.' })
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a supplier' })
  @ApiNoContentResponse({ description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Supplier not found.' })
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }

  @Post(':id/brands/:brandId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Associate a brand with a supplier' })
  @ApiResponse({ status: 404, description: 'Supplier or Brand not found.' })
  async associateBrand(@Param('id') id: string, @Param('brandId') brandId: string) {
    await this.suppliersService.associateBrand(id, brandId);
  }

  @Delete(':id/brands/:brandId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Dissociate a brand from a supplier' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async dissociateBrand(@Param('id') id: string, @Param('brandId') brandId: string) {
    await this.suppliersService.dissociateBrand(id, brandId);
  }
}
