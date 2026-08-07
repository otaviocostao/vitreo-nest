import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { LensMaterial } from '../enums/lens-material.enum';
import { LensType } from '../enums/lens-type.enum';
import { LensTreatment } from '../enums/lens-treatment.enum';

@ChildEntity('lens')
export class Lens extends Product {
  @ApiPropertyOptional({ description: 'The material of the lens', enum: LensMaterial, example: LensMaterial.POLICARBONATO })
  @Column({ name: 'lens_material', type: 'enum', enum: LensMaterial, nullable: true })
  lensMaterial?: LensMaterial;

  @ApiPropertyOptional({ description: 'The treatment applied to the lens', enum: LensTreatment, example: LensTreatment.ANTIRREFLEXO })
  @Column({ name: 'treatment', type: 'enum', enum: LensTreatment, nullable: true })
  treatment?: LensTreatment;

  @ApiPropertyOptional({ description: 'The type of lens', enum: LensType, example: LensType.VISAO_SIMPLES })
  @Column({ name: 'lens_type', type: 'enum', enum: LensType, nullable: true })
  lensType?: LensType;
}
