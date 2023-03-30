import { Module } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { ProductsController } from './controller/products.controller';
import { ProductsCommand } from './command/products.command';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsCommand],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri:
          config.get<string>('MONGODB_URI') ||
          'mongodb://127.0.0.1:27017/lista-de-produtos',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ProductsModule {}
