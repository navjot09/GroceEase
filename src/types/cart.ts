import { Product } from "./product";

export interface CartItem {
  _id: string;
  CartId: string;
  Quantity: number;
  ProductId: string;
}
export interface Itinerary {
  _id: string;
  CartItems: ItineraryCartItem[];
  TotalPrice: number;
  TotalDiscountedPrice: number;
  TotalNetPrice: number;
  Saving: number;
}

export interface ItineraryCartItem extends CartItem {
  ProductDetails: Product;
  TotalPrice: number;
  TotalDiscountedPrice?: number;
  NetPrice: number;
}
