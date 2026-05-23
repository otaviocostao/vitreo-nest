import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column()
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column()
  secondaryPhone: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ default: 'Bahia', nullable: true })
  state?: string;

  @Column({ name: 'zip_code', length: 10, nullable: true })
  zipCode?: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate!: Date;

  @Column({ unique: true, length: 11 })
  cpf!: string;

  @Column({ length: 20, nullable: true })
  rg?: string;

  @Column()
  gender: string;

  @Column()
  naturality: string;

  @Column()
  observations: string;
}
