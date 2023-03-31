import { Module } from '@nestjs/common';
import { ProductsModule } from './domain/products/products.module';
import { HooksModule } from './hooks/hooks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ProductsModule,
    HooksModule,
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
export class AppModule {}
