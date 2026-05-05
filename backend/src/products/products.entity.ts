import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal', { nullable: true })
  price!: number | null;

  @Column({ default: false })
  outOfStock!: boolean;
  
  @Column({
    nullable: true,
  })
  image!: string;
  
  @Column("text", { array: true, default: [] })
  images!: string[];
  
  @Column()
  category!: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}