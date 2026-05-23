import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const emailExists = await this.customerRepository.findOneBy({
      email: createCustomerDto.email,
    });
    if (emailExists) {
      throw new ConflictException(
        `Customer with email ${createCustomerDto.email} already exists`,
      );
    }

    const cpfExists = await this.customerRepository.findOneBy({
      cpf: createCustomerDto.cpf,
    });
    if (cpfExists) {
      throw new ConflictException(
        `Customer with CPF ${createCustomerDto.cpf} already exists`,
      );
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);

    if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
      const emailExists = await this.customerRepository.findOneBy({
        email: updateCustomerDto.email,
      });
      if (emailExists) {
        throw new ConflictException(
          `Customer with email ${updateCustomerDto.email} already exists`,
        );
      }
    }

    if (updateCustomerDto.cpf && updateCustomerDto.cpf !== customer.cpf) {
      const cpfExists = await this.customerRepository.findOneBy({
        cpf: updateCustomerDto.cpf,
      });
      if (cpfExists) {
        throw new ConflictException(
          `Customer with CPF ${updateCustomerDto.cpf} already exists`,
        );
      }
    }

    const updatedCustomer = this.customerRepository.merge(
      customer,
      updateCustomerDto,
    );
    return await this.customerRepository.save(updatedCustomer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
