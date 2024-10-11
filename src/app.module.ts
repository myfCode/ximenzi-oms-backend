import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './services/order/order.module';
import { DbModule } from './db/db.module';
import { OrderTableModule } from './tables/order/order.table.module';

@Module({
  imports: [DbModule, OrderModule, OrderTableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
