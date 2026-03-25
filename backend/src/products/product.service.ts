import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductsService {
    constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

    async findAll(search?: string, category?: string) {
      const query = this.productRepo.createQueryBuilder('product');
    
      if (search) {
        query.andWhere('product.name ILIKE :search', {
          search: `%${search}%`,
        });
      }
    
      if (category) {
        query.andWhere('product.category = :category', { category });
      }
    
      try {
        return await query.getMany();
      } catch (error) {
        throw new HttpException(
          'Error al obtener productos',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    async findOne(id: string) {
      const productId = await this.productRepo.findOne({
        where: { id },
      });

      if (!productId) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      return productId;
    }

    async create(data: any) {
    try {
      const product = await this.productRepo.save(data);

      return {
        message: 'Producto creado correctamente',
        data: product,
      };
    } catch (error) {
      throw new HttpException(
          'Error al crear el producto',
          HttpStatus.BAD_REQUEST,
          );
    }
    }

    async delete(id: string) {
      const deleteProduct = await this.productRepo.findOne({
        where: { id }
      });

      if (!deleteProduct) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      };

        try {
          await this.productRepo.delete(id);

          return {
            message: 'Producto eliminado correctamente',
          };
        } catch (error) {
          throw new HttpException(
          'Error al eliminar el producto',
          HttpStatus.BAD_REQUEST,
          );
        }
    }

    async update(id: string, data: any) {
      const updateProduct = await this.productRepo.findOne({
        where: { id }
      });

      if (!updateProduct) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      try {
        await this.productRepo.update(id, data);

        return {
          message: 'Producto actualizado correctamente',
        };
      } catch (error) {
        throw new HttpException(
          'Error al actualizar el producto',
          HttpStatus.BAD_REQUEST,
        );
      }
    } 
}