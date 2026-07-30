import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Lens } from './entities/lens.entity';
import { Frame } from './entities/frame.entity';
import { SuppliersService } from '../suppliers/suppliers.service';
import { BrandsService } from '../brands/brands.service';
import { Brand } from '../brands/entities/brand.entity';

import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Lens)
    private readonly lensRepository: Repository<Lens>,
    @InjectRepository(Frame)
    private readonly frameRepository: Repository<Frame>,
    private readonly suppliersService: SuppliersService,
    private readonly brandsService: BrandsService,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const supplier = await this.suppliersService.findOne(createProductDto.supplierId);

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${createProductDto.supplierId} not found`);
    }

    let brand: Brand | undefined = undefined;
    if (createProductDto.brandId) {
      brand = await this.brandsService.findOne(createProductDto.brandId);

      if (!brand) {
        throw new NotFoundException(`Brand with ID ${createProductDto.brandId} not found`);
      }
    }

    let product: Product;

    if (createProductDto.productType === 'lens') {
      product = this.lensRepository.create({
        ...createProductDto,
        supplier,
        brand,
      });
    } else {
      product = this.frameRepository.create({
        ...createProductDto,
        supplier,
        brand,
      });
    }

    if (product.salePrice && product.cost) {
      product.profitMargin = ((product.salePrice - product.cost) / product.cost) * 100;
    }

    const savedProduct = await this.productRepository.save(product);
    savedProduct.productType = createProductDto.productType;
    return savedProduct;
  }

  async findAll(filterDto?: FilterProductDto): Promise<any> {
    const page = filterDto?.page ?? 0;
    const size = filterDto?.size ?? 10;
    const skip = page * size;

    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.brand', 'brand');

    if (filterDto?.query) {
      const q = `%${filterDto.query.toLowerCase()}%`;
      queryBuilder.andWhere(
        '(LOWER(product.name) LIKE :q OR LOWER(product.reference) LIKE :q OR LOWER(product.barcode) LIKE :q OR LOWER(brand.name) LIKE :q)',
        { q },
      );
    }

    if (filterDto?.type) {
      queryBuilder.andWhere('LOWER(product.productType) = :type', {
        type: filterDto.type.toLowerCase(),
      });
    }

    if (filterDto?.sort) {
      const [field, order] = filterDto.sort.split(',');
      const sortOrder = order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`product.${field || 'name'}`, sortOrder);
    } else {
      queryBuilder.orderBy('product.name', 'ASC');
    }

    queryBuilder.skip(skip).take(size);

    const [content, totalElements] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalElements / size) || 1;

    return {
      content,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: { sorted: true, unsorted: false, empty: false },
        offset: skip,
        paged: true,
        unpaged: false,
      },
      totalPages,
      totalElements,
      last: page >= totalPages - 1,
      size,
      number: page,
      sort: { sorted: true, unsorted: false, empty: false },
      numberOfElements: content.length,
      first: page === 0,
      empty: content.length === 0,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.supplierId) {
      const supplier = await this.suppliersService.findOne(updateProductDto.supplierId);
      product.supplier = supplier;
    }

    if (updateProductDto.brandId) {
      const brand = await this.brandsService.findOne(updateProductDto.brandId);
      product.brand = brand;
    } else if (updateProductDto.brandId === null) {
      product.brand = undefined;
    }

    
    const updated = this.productRepository.merge(product, updateProductDto);

    if (updated.salePrice && updated.cost) {
      updated.profitMargin = ((updated.salePrice - updated.cost) / updated.cost) * 100;
    }

    return await this.productRepository.save(updated);
  }

  async updateActive(id: string, isActive: boolean): Promise<Product> {
    const product = await this.findOne(id);
    product.isActive = isActive;
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
