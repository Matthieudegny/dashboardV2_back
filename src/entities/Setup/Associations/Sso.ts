import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order } from '../../Sub_Order';
import { SetupSubOrder } from '../SetupSubOrder';

@Entity({ name: 'sso' })
export class Sso {
  @PrimaryGeneratedColumn()
  sso_id: number;

  @Column()
  sso_setup_so_id: number;

  @ManyToOne(() => SetupSubOrder, (Setup_so) => Setup_so.setupSubOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sso_setupSubOrder_id' })
  Setup_so?: SetupSubOrder;

  @Column()
  sso_so_id: number;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.subOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sso_so_id' })
  Sub_Order?: Sub_Order;
}
