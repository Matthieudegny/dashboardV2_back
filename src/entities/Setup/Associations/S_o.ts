import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../Order';
import { SetupOrder } from '../SetupOrder';

@Entity({ name: 's_o' })
export class S_o {
  @PrimaryGeneratedColumn()
  s_o_id: number;

  @Column()
  s_o_setupOrder_id: number;
  @ManyToOne(() => SetupOrder, (Setup) => Setup.setupOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_o_setupOrder_id' })
  Setup?: SetupOrder;

  @Column()
  s_o_order_id: number;
  @ManyToOne(() => Order, (Order) => Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_o_order_id' })
  Order?: Order;
}
