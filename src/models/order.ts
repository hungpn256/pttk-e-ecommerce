import { BookItem } from "./book";

export interface Shipment{
  id: number;
  supplier: string;
  type: string;
  address: string;
  price: string;
}

export interface Payment{
  id: number;
  supplier: string;
  type: string;
  shipmentID?: number;
}

export interface CartItem{
  id: number;
  cartID: number;
  quantity: number;
  bookItem: BookItem;
}

export interface Cart{
  id: number;
  dateCreat: Date;
  status: string;
  listCartItem: CartItem[]
}
export interface Order{
  id: number;
  cart: Cart;
  dateCreat: Date;
  status: string;
  payment: Payment;
  shipment: Shipment;
}
