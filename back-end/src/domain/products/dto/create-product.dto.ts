import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CathegoryEnum } from 'src/enums/cathegory.enum';
import { IProduct } from 'src/types/Product';

export class CreateProductDto implements IProduct {
  @ApiProperty({
    example: 'Product 1',
    description: 'Product name',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'Product 1 description',
    description: 'Product description',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 500.44,
    description: 'Product price',
    type: Number,
    required: true,
    minimum: 0.01,
  })
  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with max 2 decimal places' },
  )
  @Min(0.01)
  price: number;

  @ApiProperty({
    example: true,
    description: 'Product in stock',
    type: Boolean,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  in_stock: boolean;

  @ApiProperty({
    example: 4.5,
    description: 'Product rating score',
    type: Number,
    required: true,
    minimum: 0,
    maximum: 5,
  })
  @IsNotEmpty()
  @Max(5)
  @Min(0)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Score must be a number with max 2 decimal places' },
  )
  score: number;

  @ApiProperty({
    example: 'ELECTRONICS',
    description: 'Product cathegory',
    enum: CathegoryEnum,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CathegoryEnum)
  cathegory: CathegoryEnum;

  @ApiProperty({
    example: 'Manufacturer 1',
    description: 'Product manufacturer',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}
