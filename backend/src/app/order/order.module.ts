import { Module } from '@nestjs/common';
import { OrderController } from './order.controllet';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
