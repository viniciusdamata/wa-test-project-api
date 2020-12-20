import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from '../../database/models/order';
import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.insert(model);
    return order;
  }

  public async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');

    this.orderRepository.remove(id);
  }

  public async update(id: number, model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    model.id = id;
    return this.orderRepository.update(model);
  }

  public async details(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
