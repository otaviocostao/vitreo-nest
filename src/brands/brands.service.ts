import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const exists = await this.brandRepository.findOneBy({ name: createBrandDto.name });
    if (exists) {
      throw new ConflictException(`Brand with name "${createBrandDto.name}" already exists`);
    }
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    if (updateBrandDto.name && updateBrandDto.name !== brand.name) {
      const exists = await this.brandRepository.findOneBy({ name: updateBrandDto.name });
      if (exists) {
        throw new ConflictException(`Brand with name "${updateBrandDto.name}" already exists`);
      }
    }
    const updated = this.brandRepository.merge(brand, updateBrandDto);
    return await this.brandRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const brand = await this.findOne(id);
    await this.brandRepository.remove(brand);
  }
}
