import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import mongoose from 'mongoose';

@Injectable()
export class ProductsRepository {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: mongoose.Types.ObjectId) {
    return `This action returns a #${id} product`;
  }

  update(id: mongoose.Types.ObjectId, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: mongoose.Types.ObjectId) {
    return `This action removes a #${id} product`;
  }
}
