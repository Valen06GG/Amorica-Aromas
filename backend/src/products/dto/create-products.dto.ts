import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
  
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsArray({ message: 'images debe ser un arreglo' })
  @IsString({ each: true, message: 'Cada imagen debe ser un texto (URL)' })
  @IsNotEmpty()
  images!: string[];

  @IsString()
  @IsNotEmpty()
  category!: string;
}