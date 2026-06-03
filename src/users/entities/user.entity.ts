import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ApiProperty({ description: 'The unique identifier (UUID) of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The unique username of the user', example: 'john_doe' })
  @Column({ unique: true, nullable: false })
  username: string;

  @ApiProperty({ description: 'The email address of the user (unique)', example: 'user@example.com' })
  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false, select: false })
  password: string;
}
