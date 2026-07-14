import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const cnpjExists = await this.supplierRepository.findOneBy({
      cnpj: createSupplierDto.cnpj,
    });
    if (cnpjExists) {
      throw new ConflictException(
        `Supplier with CNPJ ${createSupplierDto.cnpj} already exists`,
      );
    }

    const supplier = this.supplierRepository.create(createSupplierDto);
    return await this.supplierRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find({
      relations: ['brands'],
    });
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { id },
      relations: ['brands'],
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    if (updateSupplierDto.cnpj && updateSupplierDto.cnpj !== supplier.cnpj) {
      const exists = await this.supplierRepository.findOneBy({ cnpj: updateSupplierDto.cnpj });
      if (exists) {
        throw new ConflictException(`Supplier with CNPJ "${updateSupplierDto.cnpj}" already exists`);
      }
    }
    const updated = this.supplierRepository.merge(supplier, updateSupplierDto);
    return await this.supplierRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const supplier = await this.findOne(id);
    await this.supplierRepository.remove(supplier);
  }

  async associateBrand(supplierId: string, brandId: string): Promise<void> {
    const supplier = await this.findOne(supplierId);
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    brand.supplierId = supplier.id;
    await this.brandRepository.save(brand);
  }

  async dissociateBrand(supplierId: string, brandId: string): Promise<void> {
    const brand = await this.brandRepository.findOneBy({ id: brandId });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    if (brand.supplierId === supplierId) {
      brand.supplierId = null as any;
      await this.brandRepository.save(brand);
    }
  }
}
