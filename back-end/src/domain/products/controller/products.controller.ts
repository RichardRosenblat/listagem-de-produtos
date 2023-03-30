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
  @ApiOkResponse({ type: [ProductDto] })
  findAll() {
    return this.command.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.command.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ type: ProductDto })
  @ApiBadRequestResponse({ description: 'Product body is not valid' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.command.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by id' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiBadRequestResponse({ description: 'Product body is not valid' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.command.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.command.remove(id);
  }
}
