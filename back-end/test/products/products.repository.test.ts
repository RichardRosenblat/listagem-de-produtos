import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsRepository } from '../../src/domain/products/repository/products.repository';
import { ProductModel } from '../../src/domain/products/model/product.model';
import { ModelMock } from '../mocks/product-model.mock';
import mongoose from 'mongoose';

describe('ProductsRepository', () => {
  let module: TestingModule;
  let productRepository: ProductsRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: getModelToken(ProductModel.name),
          useValue: ModelMock,
        },
      ],
    }).compile();

    productRepository = module.get<ProductsRepository>(ProductsRepository);
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
    it('should return an array of products', async () => {
      const productsList = await productRepository.findAll();
      expect(productsList).toHaveLength(2);
    });
    it('should return an empty array if no products are found', async () => {
      ModelMock.resetMemoryDatabase();
      const productsList = await productRepository.findAll();
      expect(productsList).toHaveLength(0);
    });
    it('should return an array of products with the correct properties', async () => {
      const productsList = await productRepository.findAll();
      expect(productsList[0]).toHaveProperty('name');
      expect(productsList[0]).toHaveProperty('description');
      expect(productsList[0]).toHaveProperty('manufacturer');
      expect(productsList[0]).toHaveProperty('price');
      expect(productsList[0]).toHaveProperty('in_stock');
      expect(productsList[0]).toHaveProperty('score');
    });
  });
  describe('findOne', () => {
    it('should return a product', async () => {
      const foundProduct = await productRepository.findOne(
        ModelMock.memoryDatabase[0]._id,
      );
      expect(foundProduct).toHaveProperty('name');
      expect(foundProduct).toHaveProperty('description');
      expect(foundProduct).toHaveProperty('manufacturer');
      expect(foundProduct).toHaveProperty('price');
      expect(foundProduct).toHaveProperty('in_stock');
      expect(foundProduct).toHaveProperty('score');
    });
    it('should return null if no product is found', async () => {
      ModelMock.resetMemoryDatabase();
      const foundProduct = await productRepository.findOne(
        new mongoose.Types.ObjectId(),
      );
      expect(foundProduct).toBeNull();
    });
    it('should return a product with the correct properties', async () => {
      const productFromDb = ModelMock.memoryDatabase[0];
      const foundProduct = await productRepository.findOne(
        ModelMock.memoryDatabase[0]._id,
      );
      expect(foundProduct.name).toBe(productFromDb.name);
      expect(foundProduct.description).toBe(productFromDb.description);
      expect(foundProduct.manufacturer).toBe(productFromDb.manufacturer);
      expect(foundProduct.price).toBe(productFromDb.price);
      expect(foundProduct.in_stock).toBe(productFromDb.in_stock);
      expect(foundProduct.score).toBe(productFromDb.score);
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
    it('should return the created product', async () => {
      const createdProduct = await productRepository.create(newProduct);
      expect(createdProduct).toHaveProperty('name');
      expect(createdProduct).toHaveProperty('description');
      expect(createdProduct).toHaveProperty('manufacturer');
      expect(createdProduct).toHaveProperty('price');
      expect(createdProduct).toHaveProperty('in_stock');
      expect(createdProduct).toHaveProperty('score');
    });
    it('should create a product with the correct properties', async () => {
      const createdProduct = await productRepository.create(newProduct);
      expect(createdProduct.name).toBe(newProduct.name);
      expect(createdProduct.description).toBe(newProduct.description);
      expect(createdProduct.manufacturer).toBe(newProduct.manufacturer);
      expect(createdProduct.price).toBe(newProduct.price);
      expect(createdProduct.in_stock).toBe(newProduct.in_stock);
      expect(createdProduct.score).toBe(newProduct.score);
    });
    it('should insert the product into the database', async () => {
      await productRepository.create(newProduct);
      expect(
        ModelMock.memoryDatabase[ModelMock.memoryDatabase.length - 1],
      ).toStrictEqual(expect.objectContaining(newProduct));
    });
  });
  describe('update', () => {
    const updatedProduct = {
      name: 'new name',
      description: 'new description',
      manufacturer: 'new manufacturer',
      price: 4,
      in_stock: false,
      score: 2,
    };
    it('should return the updated product', async () => {
      const productUpdated = await productRepository.update(
        ModelMock.memoryDatabase[0]._id,
        updatedProduct,
      );
      expect(productUpdated).toHaveProperty('name');
      expect(productUpdated).toHaveProperty('description');
      expect(productUpdated).toHaveProperty('manufacturer');
      expect(productUpdated).toHaveProperty('price');
      expect(productUpdated).toHaveProperty('in_stock');
      expect(productUpdated).toHaveProperty('score');
    });
    it('should update a product with the correct properties', async () => {
      const productUpdated = await productRepository.update(
        ModelMock.memoryDatabase[0]._id,
        updatedProduct,
      );
      expect(productUpdated.name).toBe(updatedProduct.name);
      expect(productUpdated.description).toBe(updatedProduct.description);
      expect(productUpdated.manufacturer).toBe(updatedProduct.manufacturer);
      expect(productUpdated.price).toBe(updatedProduct.price);
      expect(productUpdated.in_stock).toBe(updatedProduct.in_stock);
      expect(productUpdated.score).toBe(updatedProduct.score);
    });
    it('should update the product in the database', async () => {
      await productRepository.update(
        ModelMock.memoryDatabase[0]._id,
        updatedProduct,
      );
      expect(ModelMock.memoryDatabase[0]).toStrictEqual(
        expect.objectContaining(updatedProduct),
      );
    });
    it('should return null if no product is found', async () => {
      const productUpdated = await productRepository.update(
        new mongoose.Types.ObjectId(),
        updatedProduct,
      );
      expect(productUpdated).toBeNull();
    });
  });
  describe('delete', () => {
    it('should return the deleted product', async () => {
      const deletedProduct = await productRepository.remove(
        ModelMock.memoryDatabase[0]._id,
      );
      expect(deletedProduct).toHaveProperty('name');
      expect(deletedProduct).toHaveProperty('description');
      expect(deletedProduct).toHaveProperty('manufacturer');
      expect(deletedProduct).toHaveProperty('price');
      expect(deletedProduct).toHaveProperty('in_stock');
      expect(deletedProduct).toHaveProperty('score');
    });
    it('should delete a product with the correct properties', async () => {
      const productFromDb = ModelMock.memoryDatabase[0];
      const deletedProduct = await productRepository.remove(
        ModelMock.memoryDatabase[0]._id,
      );
      expect(deletedProduct.name).toBe(productFromDb.name);
      expect(deletedProduct.description).toBe(productFromDb.description);
      expect(deletedProduct.manufacturer).toBe(productFromDb.manufacturer);
      expect(deletedProduct.price).toBe(productFromDb.price);
      expect(deletedProduct.in_stock).toBe(productFromDb.in_stock);
      expect(deletedProduct.score).toBe(productFromDb.score);
    });
    it('should delete the product from the database', async () => {
      await productRepository.remove(ModelMock.memoryDatabase[0]._id);
      expect(ModelMock.memoryDatabase).toHaveLength(1);
    });
    it('should return null if no product is found', async () => {
      const deletedProduct = await productRepository.remove(
        new mongoose.Types.ObjectId(),
      );
      expect(deletedProduct).toBeNull();
    });
  });
});
