import { Module } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { ProductsController } from './controller/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository],
})
export class ProductsModule {}
