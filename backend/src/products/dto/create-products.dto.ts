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

  @IsArray()
  @IsString({ each: true})
  images!: string[];

  @IsString()
  @IsNotEmpty()
  category!: string;
}