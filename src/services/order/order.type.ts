export interface IOrderFilter {
  orderId?: string; // (订单ID)
  orderName?: string; // (订单名称)
  orderDescription?: string; //s (订单描述)
  amountMin?: number;
  amountMax?: number;
  orderDateStart?: number;
  orderDateEnd?: number;
}
