import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';
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
export class Suborder {
  @PrimaryGeneratedColumn()
  subOrder_id: number;

  @Column()
  subOrder_order_id: number;
  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subOrder_order_id' })
  Global_Order?: Order;

  @Column()
  subOrder_user_id: number;
  @ManyToOne(() => User, (user) => user.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subOrder_user_id' })
  user?: User;

  @Column({ type: 'datetime' })
  subOrder_openDate: Date;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_quantityAsset_sold: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_quantityAsset_sold_Perc: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_exitPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_result: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    transformer: new DecimalColumnTransformer(),
  })
  subOrder_amountSold: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  subOrder_comment: string | null;
}
