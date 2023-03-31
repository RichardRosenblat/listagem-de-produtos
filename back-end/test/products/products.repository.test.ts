import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsRepository } from '../../src/domain/products/repository/products.repository';
import { ProductModel } from '../../src/domain/products/model/product.model';
import { ModelMock } from '../mocks/product-model.mock';

describe('ProductsRepository', () => {
  let module: TestingModule;
  let productRepository: ProductsRepository;
  let modelMock: ModelMock;

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
    modelMock = module.get<ModelMock>(getModelToken(ProductModel.name));
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
    it('should return an array of products', () => ({}));
  });

  describe('create', () => {
    it('should create a product', async () => {
      const expectedProduct = {
        name: 'Product 1',
        description: 'Product 1 description',
        price: 500.44,
        in_stock: true,
        score: 4.5,
        manufacturer: 'Manufacturer 1',
      };
      const product = await productRepository.create(expectedProduct);
      console.log(ModelMock.memoryDatabase[2]);
      expect(product).toContain(expectedProduct);
    });
  });
});
