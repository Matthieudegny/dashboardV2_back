import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../Order';
import { SetupOrder } from '../SetupOrder';

@Entity({ name: 'so' })
export class So {
  @PrimaryGeneratedColumn()
  so_id: number;

  @Column()
  so_setupOrder_id: number;
  @ManyToOne(() => SetupOrder, (Setup) => Setup.setupOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_setupOrder_id' })
  Setup?: SetupOrder;

  @Column()
  so_order_id: number;
  @ManyToOne(() => Order, (Order) => Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_order_id' })
  Order?: Order;
}
