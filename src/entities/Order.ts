import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  order_user_id: number;

  @ManyToOne(() => User, (user) => user.idUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_user_id' })
  user?: User;

  @Column({ type: 'datetime' })
  order_openDate: Date;

  @Column({ type: 'varchar', length: 45 })
  order_asset: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  order_quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  order_entryPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  order_percentageEngaged: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  order_amountEngaged: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  order_percentageStopLoss: number;

  @Column({ type: 'boolean' })
  order_status: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  order_result: number;

  @Column({ type: 'text' })
  order_comment: string;

  @Column()
  order_direction: string;
}
