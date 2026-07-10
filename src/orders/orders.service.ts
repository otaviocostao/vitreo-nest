import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Payment } from './entities/payment.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Prescription } from '../prescriptions/entities/prescription.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findOneBy({ id: createOrderDto.customerId });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createOrderDto.customerId} not found`);
    }

    let prescription: Prescription | null = null;
    if (createOrderDto.prescriptionId) {
      prescription = await this.prescriptionRepository.findOneBy({ id: createOrderDto.prescriptionId });
      if (!prescription) {
        throw new NotFoundException(`Prescription with ID ${createOrderDto.prescriptionId} not found`);
      }
    }

    const orderItems: OrderItem[] = [];
    let calculatedTotal = 0;

    for (const itemDto of createOrderDto.items) {
      const product = await this.productRepository.findOneBy({ id: itemDto.productId });
      if (!product) {
        throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
      }

      const item = new OrderItem();
      item.product = product;
      item.quantity = itemDto.quantity;
      item.unitPrice = itemDto.unitPrice;
      orderItems.push(item);

      calculatedTotal += itemDto.quantity * itemDto.unitPrice;
    }

    const discount = createOrderDto.discount || 0;
    const finalValue = calculatedTotal - discount;

    const payments: Payment[] = [];
    if (createOrderDto.payments) {
      for (const payDto of createOrderDto.payments) {
        const payment = new Payment();
        payment.paymentMethod = payDto.paymentMethod;
        payment.amountPaid = payDto.amountPaid;
        payment.installments = payDto.installments ?? 1;
        payments.push(payment);
      }
    }

    const order = this.orderRepository.create({
      customer,
      prescription,
      serviceOrder: createOrderDto.serviceOrder,
      orderDate: new Date(createOrderDto.orderDate),
      deliveryForecastDate: createOrderDto.deliveryForecastDate ? new Date(createOrderDto.deliveryForecastDate) : undefined,
      deliveryDate: createOrderDto.deliveryDate ? new Date(createOrderDto.deliveryDate) : undefined,
      frameValue: createOrderDto.frameValue,
      lensValue: createOrderDto.lensValue,
      totalValue: calculatedTotal,
      finalValue: finalValue >= 0 ? finalValue : 0,
      discount,
      status: createOrderDto.status,
      observations: createOrderDto.observations,
      items: orderItems,
      payments,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['customer', 'prescription', 'items', 'items.product', 'payments'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'prescription', 'items', 'items.product', 'payments'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (updateOrderDto.customerId) {
      const customer = await this.customerRepository.findOneBy({ id: updateOrderDto.customerId });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${updateOrderDto.customerId} not found`);
      }
      order.customer = customer;
    }

    if (updateOrderDto.prescriptionId !== undefined) {
      if (updateOrderDto.prescriptionId === null) {
        order.prescription = null;
      } else {
        const prescription = await this.prescriptionRepository.findOneBy({ id: updateOrderDto.prescriptionId });
        if (!prescription) {
          throw new NotFoundException(`Prescription with ID ${updateOrderDto.prescriptionId} not found`);
        }
        order.prescription = prescription;
      }
    }

    if (updateOrderDto.items) {
      await this.orderRepository.manager.delete(OrderItem, { order: { id: order.id } });

      const orderItems: OrderItem[] = [];
      let calculatedTotal = 0;

      for (const itemDto of updateOrderDto.items) {
        const product = await this.productRepository.findOneBy({ id: itemDto.productId });
        if (!product) {
          throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
        }

        const item = new OrderItem();
        item.product = product;
        item.quantity = itemDto.quantity;
        item.unitPrice = itemDto.unitPrice;
        item.order = order;
        orderItems.push(item);

        calculatedTotal += itemDto.quantity * itemDto.unitPrice;
      }
      order.items = orderItems;
      order.totalValue = calculatedTotal;
    }

    if (updateOrderDto.payments) {
      await this.orderRepository.manager.delete(Payment, { order: { id: order.id } });

      const payments: Payment[] = [];
      for (const payDto of updateOrderDto.payments) {
        const payment = new Payment();
        payment.paymentMethod = payDto.paymentMethod;
        payment.amountPaid = payDto.amountPaid;
        payment.installments = payDto.installments ?? 1;
        payment.order = order;
        payments.push(payment);
      }
      order.payments = payments;
    }

    const { customerId, prescriptionId, items, payments, orderDate, deliveryForecastDate, deliveryDate, ...rest } = updateOrderDto;

    this.orderRepository.merge(order, rest);

    if (orderDate) {
      order.orderDate = new Date(orderDate);
    }
    if (deliveryForecastDate) {
      order.deliveryForecastDate = new Date(deliveryForecastDate);
    }
    if (deliveryDate) {
      order.deliveryDate = new Date(deliveryDate);
    }

    const discount = order.discount || 0;
    const finalValue = order.totalValue - discount;
    order.finalValue = finalValue >= 0 ? finalValue : 0;

    await this.orderRepository.save(order);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
