import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiCreatedResponse({ description: 'The company has been successfully created.', type: Company })
  @ApiConflictResponse({ description: 'Company with this CNPJ already exists.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({ description: 'List of all companies.', type: [Company] })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', description: 'The company ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The company details.', type: Company })
  @ApiNotFoundResponse({ description: 'Company not found.' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing company' })
  @ApiParam({ name: 'id', description: 'The company ID (UUID)', format: 'uuid' })
  @ApiOkResponse({ description: 'The company has been successfully updated.', type: Company })
  @ApiNotFoundResponse({ description: 'Company not found.' })
  @ApiConflictResponse({ description: 'Company with this CNPJ already exists.' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', description: 'The company ID (UUID)', format: 'uuid' })
  @ApiNoContentResponse({ description: 'The company has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Company not found.' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
