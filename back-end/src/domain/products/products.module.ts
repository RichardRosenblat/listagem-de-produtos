import { Module } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { ProductsController } from './controller/products.controller';
import { ProductsCommand } from './command/products.command';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './model/product.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsCommand],
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
})
export class ProductsModule {}
