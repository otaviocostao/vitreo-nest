import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'corporate_name', nullable: false })
  corporateName: string;

  @Column({ name: 'trade_name', nullable: true })
  tradeName?: string;

  @Column({ unique: true, length: 14, nullable: false })
  cnpj: string;

  @Column({ name: 'state_registration', nullable: true })
  stateRegistration?: string;

  @Column({ name: 'cell_phone', nullable: true })
  cellPhone?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ default: 'Bahia', nullable: true })
  state?: string;

  @Column({ name: 'zip_code', length: 8, nullable: true })
  zipCode?: string;
}
