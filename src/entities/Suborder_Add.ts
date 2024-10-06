import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';

import { suborder_directionType } from 'src/sub_order/sub_order_add/model/model-suborder_direction';

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Suborder_Add {
  @PrimaryGeneratedColumn()
  subOrder_add_id: number;
  @Column()
  subOrder_add_order_id: number;

  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subOrder_add_order_id' })
  Global_Order?: Order;

  @Column({ type: 'datetime' })
  subOrder_add_openDate: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_add_quantityAsset_bought: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_add_quantityAsset_bought_Perc: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_add_entryPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_add_amountBought: number;

  @Column({ type: 'text' })
  subOrder_add_comment: string;

  @Column({ type: 'enum', enum: suborder_directionType })
  subOrder_add_direction: suborder_directionType;
}
