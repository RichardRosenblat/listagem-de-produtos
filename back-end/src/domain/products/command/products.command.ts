import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsCommand {
  constructor(private readonly repository: ProductsRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.repository.create(createProductDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateProductDto: CreateProductDto) {
    return this.repository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
