import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Headers,
  Inject,
  Put,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ODataRequestDto } from 'src/dto/odata.dto';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  ProductDto,
  ProductImageDto,
} from 'src/dto/product.dto';
import { IdDto, UserIdDto } from 'src/dto/common.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FastifyReply } from 'fastify';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private productService: ProductService,
  ) {}

  @Get()
  getProducts(@Query() dto: ODataRequestDto & UserIdDto) {
    return this.productService.getProducts({ ...dto });
  }

  @Get(':id')
  getProduct(@Param() dto: IdDto, @Query() user_id: UserIdDto) {
    return this.productService.getProduct({ ...dto, ...user_id });
  }

  // @Get(':id/image/:image_id')
  // async getProductImage(
  //   @Headers('if-none-match') etag: string,
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  //   @Param('image_id', new ParseUUIDPipe({ version: '4' })) image_id: string,
  //   @Res({ passthrough: true }) response: FastifyReply,
  // ) {
  //   const key = `image_${id}_${image_id}`;

  //   const cacheImage = await this.cacheManager.get(key);

  //   if (cacheImage === etag) {
  //     response.code(304);
  //     return;
  //   }

  //   const result = await this.productService.getProductImage(id, image_id);

  //   if (!result) return;

  //   response.header('ETag', result.etag);

  //   return new StreamableFile(result.buffer);
  // }

  // @Put(':id')
  // setProductImage(
  //   @Param('id', new ParseUUIDPipe({ version: '4' }))
  //   id: string,
  //   @Body() dto: ProductImageDto,
  // ) {
  //   return this.productService.setProductImage({
  //     image: dto.image,
  //     product_id: id,
  //   });
  // }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Delete(':id')
  deleteProduct(@Param() id: IdDto) {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(@Param() id: IdDto, @Body() dto: ProductDto) {
    return this.productService.updateProduct({ ...dto, id: id.id });
  }
}
