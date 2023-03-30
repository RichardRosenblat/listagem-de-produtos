import mongoose from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

const {
  Types: { ObjectId },
} = mongoose;

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
    const objectId = this.getObjectId(id);
    return this.repository.findOne(objectId);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const objectId = this.getObjectId(id);
    return this.repository.update(objectId, updateProductDto);
  }

  remove(id: string) {
    const objectId = this.getObjectId(id);
    return this.repository.remove(objectId);
  }

  private getObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(['Id must be a valid ObjectId']);
    }
    return new ObjectId(id);
  }
}
