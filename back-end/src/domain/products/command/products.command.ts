import mongoose from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDto } from '../dto/product.dto';

const {
  Types: { ObjectId },
} = mongoose;

@Injectable()
export class ProductsCommand {
  constructor(private readonly repository: ProductsRepository) {}

  /**
   * Get all products
   * @returns {Promise<ProductDto[]>} List of all products
   * @memberof ProductsCommand
   */
  public async findAll(): Promise<ProductDto[]> {
    const list = await this.repository.findAll();
    return list.map((item) => new ProductDto(item));
  }

  /**
   * Get a product by id
   * @param {string} id Product id
   * @returns {Promise<ProductDto>}
   * @throws {NotFoundException} Product id not found
   * @throws {BadRequestException} Id must be a valid ObjectId
   * @memberof ProductsCommand
   */
  public async findOne(id: string): Promise<ProductDto> {
    const objectId = this.getObjectId(id);
    const foundProduct = await this.repository.findOne(objectId);
    if (!foundProduct) {
      throw new NotFoundException(['Product not found']);
    }
    return new ProductDto(foundProduct);
  }

  /**
   * Create a new product
   * @param {CreateProductDto} createProductDto Product body
   * @returns {Promise<ProductDto>} Created product
   * @memberof ProductsCommand
   */
  public async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const createdProduct = await this.repository.create(createProductDto);
    return new ProductDto(createdProduct);
  }

  /**
   * Update a product
   * @param {string} id Product id
   * @param {UpdateProductDto} updateProductDto Product body
   * @returns {Promise<ProductDto>} Updated product
   * @throws {NotFoundException} Product id not found
   * @throws {BadRequestException} Id must be a valid ObjectId
   * @memberof ProductsCommand
   */
  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const objectId = this.getObjectId(id);
    const updatedProduct = await this.repository.update(
      objectId,
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new NotFoundException(['Product not found']);
    }
    return new ProductDto(updatedProduct);
  }

  /**
   * Remove a product
   * @param {string} id Product id
   * @returns {Promise<ProductDto>} Removed product
   * @throws {NotFoundException} Product id not found
   * @throws {BadRequestException} Id must be a valid ObjectId
   * @memberof ProductsCommand
   */
  public async remove(id: string): Promise<ProductDto> {
    const objectId = this.getObjectId(id);
    const deletedProduct = await this.repository.remove(objectId);
    if (!deletedProduct) {
      throw new NotFoundException(['Product not found']);
    }
    return new ProductDto(deletedProduct);
  }

  private getObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(['Id must be a valid ObjectId']);
    }
    return new ObjectId(id);
  }
}
