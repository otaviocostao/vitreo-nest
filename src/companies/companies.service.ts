import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const cnpjExists = await this.companyRepository.findOneBy({
      cnpj: createCompanyDto.cnpj,
    });
    if (cnpjExists) {
      throw new ConflictException(
        `Company with CNPJ ${createCompanyDto.cnpj} already exists`,
      );
    }

    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);

    if (updateCompanyDto.cnpj && updateCompanyDto.cnpj !== company.cnpj) {
      const cnpjExists = await this.companyRepository.findOneBy({
        cnpj: updateCompanyDto.cnpj,
      });
      if (cnpjExists) {
        throw new ConflictException(
          `Company with CNPJ ${updateCompanyDto.cnpj} already exists`,
        );
      }
    }

    const updatedCompany = this.companyRepository.merge(
      company,
      updateCompanyDto,
    );
    return await this.companyRepository.save(updatedCompany);
  }

  async remove(id: string): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepository.remove(company);
  }
}
