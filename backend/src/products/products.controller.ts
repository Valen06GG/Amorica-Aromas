import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dto/create-products.dto";
import { UpdateProductDto } from "./dto/update-products.dto";
import { AdminGuard } from "src/auth/admin/admin.guard";

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
    
    @UseGuards(AdminGuard)
    @Post()
     create(
      @Body() body: CreateProductDto
    ) {
      return this.productsService.create(body);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
    ) {
        return this.productsService.update(id, body);
    }
}

