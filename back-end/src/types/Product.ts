export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  in_stock: boolean;
  score: number;
  manufacturer: string;
  updatedAt?: Date;
  createdAt?: Date;
}
