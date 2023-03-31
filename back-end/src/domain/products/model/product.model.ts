import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IProduct } from 'src/types/Product';

export type ProductDocument = HydratedDocument<IProduct>;

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  in_stock: boolean;

  @Prop()
  manufacturer: string;

  @Prop()
  score: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductFactory = SchemaFactory.createForClass(Product);
