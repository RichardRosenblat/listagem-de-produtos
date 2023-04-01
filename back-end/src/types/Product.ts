import mongoose from 'mongoose';
import { CathegoryEnum } from 'src/enums/cathegory.enum';

export interface IProduct {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
  cathegory: CathegoryEnum;
  score: number;
  manufacturer: string;
  updatedAt?: Date;
  createdAt?: Date;
}
