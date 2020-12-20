import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { SaveOrderValidator } from '../validators/order/save';

@Controller('/order')
@ApiTags('App: Order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly orderRepository: OrderRepository) {}

  @Post()
  public async save(@Body() model: SaveOrderValidator) {
    return this.orderService.save(model);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: any) {
    return this.orderRepository.list(model);
  }

  @Delete('/:orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }

  @ApiResponse({ status: 200, type: Order })
  @Get('/:orderId')
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.details(orderId);
  }

  @Put(':orderId')
  public async update(@Param('orderId', ParseIntPipe) orderId: number, @Body() model: any) {
    return this.orderService.update(orderId, model);
  }
}
