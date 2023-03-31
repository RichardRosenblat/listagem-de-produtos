import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsRepository } from '../../src/domain/products/repository/products.repository';
import { ProductModel } from '../../src/domain/products/model/product.model';
import { ModelMock } from '../mocks/product-model.mock';
import { ProductsCommand } from '../../src/domain/products/command/products.command';
import { ProductDto } from '../../src/domain/products/dto/product.dto';
import mongoose from 'mongoose';

describe('ProductsCommand', () => {
  let module: TestingModule;
  let productsCommand: ProductsCommand;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        ProductsCommand,
        {
          provide: getModelToken(ProductModel.name),
          useValue: ModelMock,
        },
      ],
    }).compile();

    productsCommand = module.get<ProductsCommand>(ProductsCommand);
  });

  beforeEach(() => {
    ModelMock.resetMemoryDatabase();
    new ModelMock({
      name: 'Product 1',
      description: 'product description',
      manufacturer: 'manufactor 1',
      price: 500.4,
      in_stock: true,
      score: 4.5,
    }).save();
    new ModelMock({
      name: 'Product 2',
      description: 'product description',
      manufacturer: 'manufactor 2',
      price: 500.4,
      in_stock: true,
      score: 4.5,
    }).save();
  });

  afterEach(() => {
    ModelMock.resetMemoryDatabase();
  });

  afterAll(() => {
    module.close();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const productsList = await productsCommand.findAll();
      expect(productsList).toHaveLength(2);
    });
    it('should return empty array if no products', async () => {
      ModelMock.resetMemoryDatabase();
      const productsList = await productsCommand.findAll();
      expect(productsList).toHaveLength(0);
    });
    it('should return an array of instances of ProductDto', async () => {
      const productsList = await productsCommand.findAll();
      expect(productsList.every((item) => item instanceof ProductDto)).toBe(
        true,
      );
    });
    it('should return an array of ProductDto with the correct values', async () => {
      const productsList = await productsCommand.findAll();
      const dbProduct = ModelMock.memoryDatabase[0];
      expect(productsList[0].name).toBe(dbProduct.name);
      expect(productsList[0].description).toBe(dbProduct.description);
      expect(productsList[0].manufacturer).toBe(dbProduct.manufacturer);
      expect(productsList[0].price).toBe(dbProduct.price);
      expect(productsList[0].in_stock).toBe(dbProduct.in_stock);
      expect(productsList[0].score).toBe(dbProduct.score);
    });
  });
  describe('findOne', () => {
    it('should return an instance of ProductDto', async () => {
      const product = await productsCommand.findOne(
        ModelMock.memoryDatabase[0]._id.toHexString(),
      );
      expect(product).toBeInstanceOf(ProductDto);
    });
    it('should return a product with the correct values', async () => {
      const product = await productsCommand.findOne(
        ModelMock.memoryDatabase[0]._id.toHexString(),
      );
      const dbProduct = ModelMock.memoryDatabase[0];
      expect(product.name).toBe(dbProduct.name);
      expect(product.description).toBe(dbProduct.description);
      expect(product.manufacturer).toBe(dbProduct.manufacturer);
      expect(product.price).toBe(dbProduct.price);
      expect(product.in_stock).toBe(dbProduct.in_stock);
      expect(product.score).toBe(dbProduct.score);
    });
    it('should throw NotFoundException if product is not found', async () => {
      try {
        await productsCommand.findOne(
          new mongoose.Types.ObjectId().toHexString(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw BadRequestException if id is not valid', async () => {
      try {
        await productsCommand.findOne('3a');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('create', () => {
    const newProduct = {
      name: 'Product 3',
      description: 'product description',
      manufacturer: 'manufactor 3',
      price: 500.4,
      in_stock: true,
      score: 4.5,
    };
    it('should return an instance of ProductDto', async () => {
      const createdProduct = await productsCommand.create(newProduct);
      expect(createdProduct).toBeInstanceOf(ProductDto);
    });
    it('should return a product with the correct values', async () => {
      const createdProduct = await productsCommand.create(newProduct);
      expect(createdProduct.name).toBe(newProduct.name);
      expect(createdProduct.description).toBe(newProduct.description);
      expect(createdProduct.manufacturer).toBe(newProduct.manufacturer);
      expect(createdProduct.price).toBe(newProduct.price);
      expect(createdProduct.in_stock).toBe(newProduct.in_stock);
      expect(createdProduct.score).toBe(newProduct.score);
    });
    it('should insert a new product in the database', async () => {
      await productsCommand.create(newProduct);
      expect(ModelMock.memoryDatabase).toHaveLength(3);
    });
  });
  describe('update', () => {
    const updateProduct = {
      name: 'Product 3',
      description: 'product description',
      manufacturer: 'manufactor 3',
      price: 500.4,
      in_stock: true,
      score: 4.5,
    };
    it('should return an instance of ProductDto', async () => {
      const productUpdated = await productsCommand.update(
        ModelMock.memoryDatabase[0]._id.toHexString(),
        updateProduct,
      );
      expect(productUpdated).toBeInstanceOf(ProductDto);
    });
    it('should return a product with the correct values', async () => {
      const productUpdated = await productsCommand.update(
        ModelMock.memoryDatabase[0]._id.toHexString(),
        updateProduct,
      );
      expect(productUpdated.name).toBe(updateProduct.name);
      expect(productUpdated.description).toBe(updateProduct.description);
      expect(productUpdated.manufacturer).toBe(updateProduct.manufacturer);
      expect(productUpdated.price).toBe(updateProduct.price);
      expect(productUpdated.in_stock).toBe(updateProduct.in_stock);
      expect(productUpdated.score).toBe(updateProduct.score);
    });
    it('should throw NotFoundException if product is not found', async () => {
      try {
        await productsCommand.update(
          new mongoose.Types.ObjectId().toHexString(),
          updateProduct,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw BadRequestException if id is not valid', async () => {
      try {
        await productsCommand.update('3a', updateProduct);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('delete', () => {
    it('should return an instance of ProductDto', async () => {
      const productDeleted = await productsCommand.remove(
        ModelMock.memoryDatabase[0]._id.toHexString(),
      );
      expect(productDeleted).toBeInstanceOf(ProductDto);
    });
    it('should return a product with the correct values', async () => {
      const dbProduct = ModelMock.memoryDatabase[0];
      const productDeleted = await productsCommand.remove(
        ModelMock.memoryDatabase[0]._id.toHexString(),
      );
      expect(productDeleted.name).toBe(dbProduct.name);
      expect(productDeleted.description).toBe(dbProduct.description);
      expect(productDeleted.manufacturer).toBe(dbProduct.manufacturer);
      expect(productDeleted.price).toBe(dbProduct.price);
      expect(productDeleted.in_stock).toBe(dbProduct.in_stock);
      expect(productDeleted.score).toBe(dbProduct.score);
    });
    it('should throw NotFoundException if product is not found', async () => {
      try {
        await productsCommand.remove(
          new mongoose.Types.ObjectId().toHexString(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw BadRequestException if id is not valid', async () => {
      try {
        await productsCommand.remove('3a');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('should delete a product from the database', async () => {
      await productsCommand.remove(
        ModelMock.memoryDatabase[0]._id.toHexString(),
      );
      expect(ModelMock.memoryDatabase).toHaveLength(1);
    });
  });
});
