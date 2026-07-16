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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['supplier', 'brand'],
    });
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
