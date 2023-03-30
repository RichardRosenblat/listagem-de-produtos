import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import mongoose from 'mongoose';

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
    const objectId = new mongoose.Types.ObjectId(id);
    return this.repository.findOne(objectId);
  }

  update(id: string, updateProductDto: CreateProductDto) {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.repository.update(objectId, updateProductDto);
  }

  remove(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return this.repository.remove(objectId);
  }
}
