import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Database from 'better-sqlite3';

@Injectable()
export class DbService implements OnModuleDestroy {
  private readonly database;
  constructor() {
    this.database = new Database(':memory:');
  }
  onModuleDestroy() {
    this.database.close();
  }

  getService() {
    return this.database;
  }
}
