import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Suborder_Reduce {
  @PrimaryGeneratedColumn()
  subOrder_reduce_id: number;
  @Column()
  subOrder_reduce_order_id: number;

  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subOrder_reduce_order_id' })
  Global_Order?: Order;

  @Column({ type: 'datetime' })
  subOrder_reduce_openDate: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_reduce_quantityAsset_sold: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_reduce_quantityAsset_sold_Perc: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_reduce_exitPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_reduce_result: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_reduce_amountSold: number;

  @Column({ type: 'text' })
  subOrder_reduce_comment: string;
}
