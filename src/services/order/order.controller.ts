import { OrderPO } from 'src/tables/order/order.type';
import { OrderTableService } from './../../tables/order/order.table.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { IOrderFilter } from './order.type';

@Controller('order')
export class OrderController {
  constructor(private readonly orderTableService: OrderTableService) {}

  @Get('/errorTest')
  errorTest() {
    throw new HttpException(
      'HttpStatus.BAD_REQUEST error',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get('/runningTest')
  runningTest() {
    return 'runningTest';
  }

  @Get('/list')
  list(@Query() query: IOrderFilter) {
    return this.orderTableService.findAll(query);
  }

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  create(@Body() body: Partial<OrderPO>) {
    /**
     * TODO:
     * 判空
     */
    return this.orderTableService.create({
      orderId: uuid4(),
      orderName: body.orderName,
      orderDate: Date.now(),
      orderDescription: body.orderDescription,
      amount: body.amount,
    });
  }

  @Put('/update/:orderId')
  update(@Param('orderId') orderId: string, @Body() body: Partial<OrderPO>) {
    if (!body.orderName && !body.orderDescription && body.amount == undefined) {
      return;
    }
    return this.orderTableService.update(orderId, {
      orderName: body.orderName,
      orderDescription: body.orderDescription,
      amount: body.amount,
    });
  }

  @Delete('/delete/:orderId')
  delete(@Param('orderId') orderId: string) {
    return this.orderTableService.delete(orderId);
  }
}
