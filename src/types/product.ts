import { Category } from "./category";

export interface Product {
  _id: string;
  Name: string;
  Brand: string;
  Description: string;
  Category: string;
  SubCategory: string;
  Image: string;
  Price: number;
  OnSale: boolean;
  Type: string;
  DiscountPrice: number;
  Stock: number;
  Quantity: string;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
  Rating?: number;
}

export interface FeaturedCategory {
  _id: { Category: string };
  Category: Category;
  products: Product[];
}
