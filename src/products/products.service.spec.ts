import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Lens } from './entities/lens.entity';
import { Frame } from './entities/frame.entity';
import { SuppliersService } from '../suppliers/suppliers.service';
import { BrandsService } from '../brands/brands.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository = {
    createQueryBuilder: jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([
        [
          { id: '1', name: 'Lens 1', productType: 'lens' },
          { id: '2', name: 'Frame 1', productType: 'frame' },
        ],
        2,
      ]),
    }),
    save: jest.fn().mockImplementation((entity) => Promise.resolve({ id: '123', ...entity })),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockLensRepository = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto })),
  };

  const mockFrameRepository = {
    create: jest.fn().mockImplementation((dto) => ({ ...dto })),
  };

  const mockSuppliersService = {
    findOne: jest.fn().mockResolvedValue({ id: 'sup-1', corporateName: 'Supplier 1' }),
  };

  const mockBrandsService = {
    findOne: jest.fn().mockResolvedValue({ id: 'brand-1', name: 'Brand 1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Lens),
          useValue: mockLensRepository,
        },
        {
          provide: getRepositoryToken(Frame),
          useValue: mockFrameRepository,
        },
        {
          provide: SuppliersService,
          useValue: mockSuppliersService,
        },
        {
          provide: BrandsService,
          useValue: mockBrandsService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products and filter by type', async () => {
      const result = await service.findAll({ type: 'frame', page: 0, size: 10 });
      expect(result.content).toHaveLength(2);
      expect(result.totalElements).toBe(2);
      expect(mockProductRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    });
  });

  describe('create', () => {
    it('should create a lens product', async () => {
      const dto: any = {
        productType: 'lens',
        supplierId: 'sup-1',
        brandId: 'brand-1',
        name: 'Test Lens',
        salePrice: 100,
        cost: 50,
      };

      const result = await service.create(dto);
      expect(mockLensRepository.create).toHaveBeenCalled();
      expect(result.productType).toBe('lens');
      expect(result.profitMargin).toBe(100);
    });
  });
});
