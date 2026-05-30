import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@ChildEntity('frame')
export class Frame extends Product {
  @ApiPropertyOptional({ description: 'The color of the frame', example: 'Matte Black' })
  @Column({ name: 'color', length: 50, nullable: true })
  color?: string;

  @ApiPropertyOptional({ description: 'The material of the frame', example: 'Acetate' })
  @Column({ name: 'material', length: 50, nullable: true })
  material?: string;

  @ApiPropertyOptional({ description: 'The size of the frame', example: '54-18-140' })
  @Column({ name: 'size', length: 20, nullable: true })
  size?: string;
}
