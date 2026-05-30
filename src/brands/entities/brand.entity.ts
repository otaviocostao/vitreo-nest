import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('brands')
export class Brand {
  @ApiProperty({ description: 'The unique identifier (UUID) of the brand', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the brand', example: 'Ray-Ban' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ApiProperty({ description: 'Indicates if the brand is active', default: true })
  @Column({ default: true, nullable: false })
  isActive: boolean;
}
