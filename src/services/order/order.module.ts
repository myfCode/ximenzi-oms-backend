import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderTableModule } from 'src/tables/order/order.table.module';

@Module({
  imports: [OrderTableModule],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
