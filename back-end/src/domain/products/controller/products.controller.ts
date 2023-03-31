import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsCommand } from '../command/products.command';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';

@ApiTags('Products Crud')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly command: ProductsCommand) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ type: [ProductDto], description: 'All products' })
  public findAll(): Promise<ProductDto[]> {
    return this.command.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiOkResponse({ type: ProductDto, description: 'Product found' })
  @ApiBadRequestResponse({ description: 'Product id is not a valid ObjectId' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product Id',
    type: String,
    example: '60e1c5b0b9b5a8a0b4b0c0c1',
  })
  public findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.command.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ type: ProductDto, description: 'Created product' })
  @ApiBadRequestResponse({ description: 'Product body is not valid' })
  @ApiBody({ type: CreateProductDto })
  public create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.command.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by id' })
  @ApiOkResponse({ type: ProductDto, description: 'Updated product' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiBadRequestResponse({ description: 'Product body is not valid' })
  @ApiBadRequestResponse({ description: 'Product id is not a valid ObjectId' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product Id',
    type: String,
    example: '60e1c5b0b9b5a8a0b4b0c0c1',
  })
  @ApiBody({ type: UpdateProductDto })
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.command.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiOkResponse({ type: ProductDto, description: 'Deleted product' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiBadRequestResponse({ description: 'Product id is not a valid ObjectId' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product Id',
    type: String,
    example: '60e1c5b0b9b5a8a0b4b0c0c1',
  })
  public remove(@Param('id') id: string): Promise<ProductDto> {
    return this.command.remove(id);
  }
}
