import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Types, Model } from 'mongoose';
import { Product } from '../model/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from 'src/types/Product';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const createdProduct = await new this.productModel(createProductDto).save();

    return createdProduct.toObject();
  }

  async findAll(): Promise<IProduct[]> {
    const productList = await this.productModel.find().exec();

    return productList.map((product) => product.toObject());
  }

  async findOne(id: Types.ObjectId): Promise<IProduct> {
    const foundProduct = await this.productModel.findOne({ _id: id }).exec();

    return foundProduct ? foundProduct.toObject() : null;
  }

  async update(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    await this.productModel.updateOne({ _id: id }, updateProductDto).exec();

    return this.findOne(id);
  }

  async remove(id: Types.ObjectId) {
    const removedProduct = await this.findOne(id);

    if (!removedProduct) return null;

    await this.productModel.deleteOne({ _id: id }).exec();

    return removedProduct;
  }
}
