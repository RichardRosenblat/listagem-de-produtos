import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IProduct } from 'src/types/Product';

export class UpdateProductDto
  extends PartialType(CreateProductDto)
  implements Partial<IProduct> {}
