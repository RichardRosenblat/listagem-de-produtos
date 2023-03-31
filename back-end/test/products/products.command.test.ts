import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductsModule } from '../../src/domain/products/products.module';
import { ProductsCommand } from '../../src/domain/products/command/products.command';
import { ProductModel } from '../../src/domain/products/model/product.model';
import { Model } from 'mongoose';

describe('ProductsCommand', () => {
  let module: TestingModule;
  // let command: ProductsCommand;
  let mongoServer: MongoMemoryServer;
  let productModel: Model<ProductModel>;

  beforeAll(async () => {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    module = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), ProductsModule],
    }).compile();
    console.log('module', module);
    // command = module.get<ProductsCommand>(ProductsCommand);
    // productModel = module.get<Model<ProductModel>>(ProductModel.name);
    await module.close();
    await mongoServer.stop();
  });

  // afterAll(async () => {
  //   await module.close();
  //   await mongoServer.stop();
  // });

  // beforeEach(async () => {
  //   await productModel.create();
  //   await productModel.create();
  // });

  // afterEach(async () => {
  //   await productModel.deleteMany({});
  // });

  it('should create a product', async () => {
    //   // const product = await command.create();
    //   // expect(product.id).toBeDefined();
    //   // expect(product.price).toBe(29.99);
  });
});
