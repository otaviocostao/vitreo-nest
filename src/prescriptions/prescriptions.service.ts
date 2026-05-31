import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';
import { Customer } from '../customers/entities/customer.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    const customer = await this.customerRepository.findOneBy({ id: createPrescriptionDto.customerId });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createPrescriptionDto.customerId} not found`);
    }

    const prescription = this.prescriptionRepository.create({
      ...createPrescriptionDto,
      customer,
      prescriptionDate: createPrescriptionDto.prescriptionDate ? new Date(createPrescriptionDto.prescriptionDate) : undefined,
    });
    return await this.prescriptionRepository.save(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: string): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription> {
    const prescription = await this.findOne(id);

    if (updatePrescriptionDto.customerId) {
      const customer = await this.customerRepository.findOneBy({ id: updatePrescriptionDto.customerId });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${updatePrescriptionDto.customerId} not found`);
      }
      prescription.customer = customer;
    }

    const { customerId, prescriptionDate, ...rest } = updatePrescriptionDto;
    
    this.prescriptionRepository.merge(prescription, rest);
    
    if (prescriptionDate) {
      prescription.prescriptionDate = new Date(prescriptionDate);
    }

    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: string): Promise<void> {
    const prescription = await this.findOne(id);
    await this.prescriptionRepository.remove(prescription);
  }
}
