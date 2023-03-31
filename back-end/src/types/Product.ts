import mongoose from 'mongoose';

export interface IProduct {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
  score: number;
  manufacturer: string;
  updatedAt?: Date;
  createdAt?: Date;
}
