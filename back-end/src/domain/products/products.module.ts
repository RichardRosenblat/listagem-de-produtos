import { Module } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { ProductsController } from './controller/products.controller';
import { ProductsCommand } from './command/products.command';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsCommand],
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
