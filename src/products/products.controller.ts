import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiNoContentResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product (Lens or Frame)' })
  @ApiCreatedResponse({ description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation failed.' })
  @ApiResponse({ status: 404, description: 'Not Found - Supplier or Brand not found.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 404, description: 'Product, Supplier, or Brand not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product active status' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  updateActive(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.productsService.updateActive(id, isActive);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiNoContentResponse({ description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
