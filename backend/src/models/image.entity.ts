import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'image' })
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => ProductEntity, (p) => p.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('uuid')
  product_id: string;

  @Column('text')
  image?: string;

  @Column('timestamp without time zone', {
    name: 'upload_time',
    nullable: true,
  })
  upload_time?: Date;
}
