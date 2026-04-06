import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
import { JwtAuthGuard } from "src/auth/admin/admin.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

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

