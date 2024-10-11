import { Database } from 'better-sqlite3';
import { DbService } from './../../db/db.service';
import { Injectable } from '@nestjs/common';
import { OrderPO } from './order.type';
import { IOrderFilter } from 'src/services/order/order.type';

@Injectable()
export class OrderTableService {
  private readonly db: Database;
  constructor(private readonly dbService: DbService) {
    this.db = this.dbService.getService();
    this.db.exec(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId TEXT NOT NULL,
      orderName TEXT NOT NULL,
      amount INTEGER NOT NULL,
      orderDate INTEGER NOT NULL,
      orderDescription TEXT
      );
      `);

    // TODO: delete
    // for (let index = 0; index < 5; index++) {
    //   this.db
    //     .exec(`INSERT INTO orders (orderId, orderName, amount, orderDate, orderDescription) VALUES (
    //         ${index},
    //         'order${index}',
    //         ${index},
    //         ${Date.now() + index},
    //         'order_description${index}'
    //         )`);
    // }
  }

  create(order: Omit<OrderPO, 'id'>) {
    const stmt = this.db.prepare(
      `INSERT INTO orders (orderId, orderName, amount, orderDate, orderDescription) VALUES (@orderId, @orderName, @amount, @orderDate, @orderDescription)`,
    );

    const res = stmt.run({
      orderId: order.orderId,
      orderName: order.orderName,
      amount: order.amount,
      orderDate: order.orderDate,
      orderDescription: order.orderDescription,
    });

    return res;
  }

  findAll(query: IOrderFilter) {
    const {
      orderId,
      orderName,
      orderDescription,
      amountMin,
      amountMax,
      orderDateStart,
      orderDateEnd,
    } = query;

    let sql = `SELECT * FROM orders WHERE 1=1 `;
    if (orderId) {
      sql += ` AND orderId LIKE '%${orderId}%'`;
    }
    if (orderName) {
      sql += ` AND orderName LIKE '%${orderName}%'`;
    }
    if (orderDescription) {
      sql += ` AND orderDescription LIKE '%${orderDescription}%'`;
    }
    if (amountMin) {
      sql += ` AND amount >= ${amountMin}`;
    }
    if (amountMax) {
      sql += ` AND amount <= ${amountMax}`;
    }
    if (orderDateStart) {
      sql += ` AND orderDate >= ${orderDateStart}`;
    }
    if (orderDateEnd) {
      sql += ` AND orderDate <= ${orderDateEnd}`;
    }

    console.log('sql', sql);

    const orderList = this.db.prepare(sql).all();
    return orderList;
  }

  findOne(id: string) {
    const order = this.db
      .prepare(`SELECT * FROM orders where orderId = ?`)
      .all(id);
    return order;
  }

  update(id: string, order: Partial<OrderPO>) {
    const stmt = this.db.prepare(
      `UPDATE orders set orderName = @orderName,  amount = @amount, orderDescription = @orderDescription where orderId = @orderId`,
    );
    stmt.run({
      orderId: id,
      orderName: order.orderName,
      amount: order.amount,
      orderDescription: order.orderDescription,
    });
    return true;
  }

  delete(id: string) {
    const stmt = this.db.prepare(`DELETE FROM orders  WHERE orderId = ?`);
    stmt.run(id);
    return true;
  }
}
