import { Module } from '@nestjs/common';
import { OrderTableService } from './order.table.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [],
  providers: [OrderTableService],
  exports: [OrderTableService],
})
export class OrderTableModule {}
