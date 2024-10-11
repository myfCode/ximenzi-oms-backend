export interface OrderPO {
  id: number;

  orderId: string; // (订单ID)
  orderName: string; // (订单名称)
  amount: number; //(金额)
  orderDate: number; //（订单日期）
  orderDescription?: string; //s (订单描述)
}
