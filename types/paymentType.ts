export interface PaymentProduct {
  productId: string;
  title: string;
  slug: string;
  imageLink: string;
  price: number;
  offPrice: number;
  quantity: number;
}

export interface PaymentCart {
  products: PaymentProduct[];
  coupon: unknown | null;
}

export interface PaymentAddress {
  province: string;
  city: string;
  street: string;
  plaque: string;
  unit: string;
}

export interface PaymentType {
  _id: string;
  invoiceNumber: string;
  paymentMethod: string;
  amount: number;
  address: PaymentAddress;
  description: string;
  status: string;
  isPaid: boolean;
  authority: string;
  user: string;
  paymentDate: string;
  cart: PaymentCart;
  createdAt: string;
  updatedAt: string;
}
