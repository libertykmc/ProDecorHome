import { Password } from 'src/libs/password';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar', { length: 40 })
  readonly login: string;

  @Column('text')
  readonly first: string;

  @Column('text', { nullable: true })
  readonly last?: string;

  @Column('text', { nullable: true })
  readonly second?: string;

  @Column('text', { nullable: true })
  readonly phone?: string;

  @Column({ type: 'boolean', default: false })
  readonly news: boolean;

  @Column('jsonb')
  readonly password?: Password;

  @Column({ type: 'integer', default: 0 })
  total_orders: number;

  @Column('text')
  readonly role: string;
}
