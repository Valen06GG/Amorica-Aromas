import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from "dotenv"
import { DataSource, DataSourceOptions } from 'typeorm';


dotenvConfig({path: ".env"});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ["dist/migrations/*{.js,.ts}"],
  synchronize: true, 
};
export default registerAs("typeorm", () => typeOrmConfig);

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions)