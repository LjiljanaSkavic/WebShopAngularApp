export interface ProductPurchase {
  id: number;
  orderId: string;
  dateTime: Date;
  isDeleted: boolean;
  paymentType: PAYMENT_TYPE;
}


export enum PAYMENT_TYPE {
  COD = 0,
  CREDIT_CARD = 1
}

export const PAYMENT_TYPE_OPTIONS = {
  COD: "Cash on delivery",
  CREDIT_CARD: "Credit card"
}
