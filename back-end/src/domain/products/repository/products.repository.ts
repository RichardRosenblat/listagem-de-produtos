import { Injectable } from '@nestjs/common';
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
  /**
   * Creates a new product
   * @param {IProduct} createProduct Product body
   * @returns {Promise<IProduct>} Created product as an object
   * @memberof ProductsRepository
   */
  public async create(createProduct: IProduct): Promise<IProduct> {
    const createdProduct = await new this.productModel(createProduct).save();

    return createdProduct.toObject();
  }

  /**
   * Gets all products
   * @returns {Promise<IProduct[]>} List of all products as objects array
   * @memberof ProductsRepository
   */
  public async findAll(): Promise<IProduct[]> {
    const productList = await this.productModel.find().exec();

    return productList.map((product) => product.toObject());
  }

  /**
   * Gets a product by id
   * @param {Types.ObjectId} id Product id
   * @returns {Promise<IProduct>} Found product as an object or null if not found
   * @memberof ProductsRepository
   */
  public async findOne(id: Types.ObjectId): Promise<IProduct> {
    const foundProduct = await this.productModel.findOne({ _id: id }).exec();

    return foundProduct ? foundProduct.toObject() : null;
  }

  /**
   * Updates a product
   * @param {Types.ObjectId} id Product id
   * @param {Partial<IProduct>} updateProduct Product body
   * @returns {Promise<IProduct>} Updated product as an object or null if not found
   * @memberof ProductsRepository
   */
  public async update(
    id: Types.ObjectId,
    updateProduct: Partial<IProduct>,
  ): Promise<IProduct> {
    await this.productModel.updateOne({ _id: id }, updateProduct).exec();

    return this.findOne(id);
  }

  /**
   * Removes a product
   * @param {Types.ObjectId} id Product id
   * @returns {Promise<IProduct>} Removed product as an object or null if not found
   * @memberof ProductsRepository
   */
  public async remove(id: Types.ObjectId): Promise<IProduct> {
    const removedProduct = await this.findOne(id);

    if (!removedProduct) return null;

    await this.productModel.deleteOne({ _id: id }).exec();

    return removedProduct;
  }
}
