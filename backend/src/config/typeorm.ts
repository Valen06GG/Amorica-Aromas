import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from "dotenv"
import { DataSource, DataSourceOptions } from 'typeorm';


dotenvConfig({path: ".env"});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ["dist/migrations/*{.js,.ts}"],
  synchronize: true, 
};
export default registerAs("typeorm", () => typeOrmConfig);

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions)