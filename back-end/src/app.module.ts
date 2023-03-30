import { Module } from '@nestjs/common';
import { ProductsModule } from './domain/products/products.module';
import { HooksModule } from './hooks/hooks.module';

@Module({
  imports: [ProductsModule, HooksModule],
})
export class AppModule {}
