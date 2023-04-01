import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CathegoryEnum } from '../../../enums/cathegory.enum';
import { IProduct } from '../../../types/Product';

export type ProductDocument = HydratedDocument<IProduct>;

@Schema({ timestamps: true })
export class ProductModel implements IProduct {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  in_stock: boolean;

  @Prop()
  manufacturer: string;

  @Prop()
  score: number;

  @Prop()
  cathegory: CathegoryEnum;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
