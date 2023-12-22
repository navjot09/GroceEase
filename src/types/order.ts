import { Address } from "./address";
import { Product } from "./product";

export interface Order {
  _id: string;
  UserId: string;
  OrderDate: string;
  TotalAmount: number;
  Status: "pending" | "completed" | "cancelled";
  DeliveryAddress: string;
  PaymentMethod: string;
  PaymentStatus: string;
  DeliveryDate: string;
  InvoiceNumber: string;
  TrackingNumber: string;
  Notes?: string;
}

export interface OrderDetails {
  _id: string;
  OrderItems: { Order: OrderItem; Product: Product }[];
  OrderDetails: Order;
  DeliveryAddressDetails: Address;
}

export interface OrderItem {
  _id: string;
  OrderId: string;
  Quantity: number;
  ProductId: string;
}
