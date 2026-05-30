import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@ChildEntity('lens')
export class Lens extends Product {
  @ApiPropertyOptional({ description: 'The material of the lens', example: 'Polycarbonate' })
  @Column({ name: 'lens_material', length: 50, nullable: true })
  lensMaterial?: string;

  @ApiPropertyOptional({ description: 'The treatment applied to the lens', example: 'Anti-glare' })
  @Column({ name: 'treatment', length: 100, nullable: true })
  treatment?: string;

  @ApiPropertyOptional({ description: 'The type of lens', example: 'Single Vision' })
  @Column({ name: 'lens_type', length: 50, nullable: true })
  lensType?: string;
}
