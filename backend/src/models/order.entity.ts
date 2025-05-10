import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Values {
  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @Type(() => String)
  phone: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Type(() => Number)
  total: number;
}

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => UserEntity, (u) => u.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('uuid')
  user_id: string;

  @Column('uuid', { array: true })
  product_ids: string[];

  @Column({ type: 'timestamp', default: () => 'now()' })
  create_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  receipt_at: Date;

  @Column({ type: 'jsonb' })
  @Type(() => Values)
  values: Values;
}
