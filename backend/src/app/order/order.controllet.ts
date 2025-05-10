import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { FavoritesRequestDto } from 'src/dto/favorites.dto';
import { CreateOrderDto } from 'src/dto/order.dto';
import { IdDto } from 'src/dto/common.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Get()
  getOrders(@Query() dto: FavoritesRequestDto) {
    return this.orderService.getOrders(dto);
  }

  @Get(':id')
  getOrder(@Param() dto: IdDto) {
    return this.orderService.getOrder(dto);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }
}
