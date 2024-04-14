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
export class Sub_Order {
  @PrimaryGeneratedColumn()
  so_id: number;

  @Column()
  so_order_id: number;

  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_order_id' })
  Global_Order?: Order;

  @Column({ type: 'datetime' })
  so_closeDate: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  so_quantityAsset_sold: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  so_quantityAsset_sold_Perc: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  so_exitPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  so_result: number;

  @Column({ type: 'text' })
  so_comment: string;
}
