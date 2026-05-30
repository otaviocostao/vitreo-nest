import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import { BrandsModule } from './brands/brands.module';
import { Brand } from './brands/entities/brand.entity';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Supplier } from './suppliers/entities/supplier.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { Lens } from './products/entities/lens.entity';
import { Frame } from './products/entities/frame.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'vitreo_db'),
        entities: [Customer, Company, Brand, Supplier, Product, Lens, Frame],
        synchronize: true,
      }),
    }),
    CustomersModule,
    CompaniesModule,
    BrandsModule,
    SuppliersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

