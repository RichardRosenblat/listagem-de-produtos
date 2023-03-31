import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from 'src/types/Product';

export class ProductDto implements IProduct {
  constructor(product: IProduct) {
    this.id =
      typeof product._id === 'string' ? product._id : product._id.toHexString();
    this.name = product.name;
    this.price = product.price;
    this.in_stock = product.in_stock;
    this.score = product.score;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
  @ApiProperty({
    example: '60e1c5b0b9b5a8a0b4b0c0c1',
    description: 'Product Id',
    readOnly: true,
    required: false,
  })
  id: string;

  @ApiProperty({
    example: 'Product 1',
    description: 'Product name',
    readOnly: true,
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 100.15,
    description: 'Product price',
    readOnly: true,
    required: false,
  })
  price: number;

  @ApiProperty({
    example: true,
    description: 'Product in stock',
    readOnly: true,
    required: false,
  })
  in_stock: boolean;

  @ApiProperty({
    example: 4.25,
    description: 'Product rating score',
    readOnly: true,
    required: false,
  })
  score: number;

  @ApiProperty({
    example: 'Manufacturer 1',
    description: 'Product manufacturer',
    readOnly: true,
    required: false,
  })
  manufacturer: string;

  @ApiProperty({
    example: '2021-07-05T20:00:00.000Z',
    description: 'Timestamp of last product update',
    readOnly: true,
    required: false,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2021-07-05T20:00:00.000Z',
    description: 'Timestamp of product creation',
    readOnly: true,
    required: false,
  })
  createdAt: Date;
}
