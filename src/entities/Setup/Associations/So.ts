import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../Order';
import { Setup_go } from '../Setup_go';

@Entity({ name: 'so' })
export class So {
  @PrimaryGeneratedColumn()
  so_id: number;

  so_setup_go_id: number;
  @ManyToOne(() => Setup_go, (Setup) => Setup.setup_go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_setup_go_id' })
  Setup?: Setup_go;

  @Column()
  so_go_id: number;
  @ManyToOne(() => Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_go_id' })
  Global_Order?: Order;
}
