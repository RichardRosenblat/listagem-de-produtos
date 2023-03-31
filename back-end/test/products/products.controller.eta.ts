import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../src/domain/products/controller/products.controller';
import { ProductsRepository } from '../../src/domain/products/repository/products.repository';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsRepository],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
