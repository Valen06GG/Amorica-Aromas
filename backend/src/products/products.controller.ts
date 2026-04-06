import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
import { JwtAuthGuard } from "src/auth/admin/admin.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from "@nestjs/config/dist/config.service";
import { cloudinaryConfig } from "src/config/cloudinary.config";

@Controller('products')
export class ProductsController {
    constructor(
      private readonly productsService: ProductsService,
      private configService: ConfigService,
    ) {
      cloudinaryConfig(this.configService);
    }

    @Get()
    findAll(
      @Query('search') search?: string,
      @Query('category') category?: string,
    ) {
      return this.productsService.findAll(search, category);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(id);
    }
    
    @Post()
    @UseGuards(JwtAuthGuard)
     create(
      @Body() body: CreateProductDto
    ) {
      return this.productsService.create(body);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async UploadImage(@UploadedFile() file: Express.Multer.File) {
      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(file.buffer);
      });
    
      return {
        url: result.secure_url,
      };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
    ) {
        return this.productsService.update(id, body);
    }
}

