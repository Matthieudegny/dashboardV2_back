import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order } from '../../Sub_Order';
import { Setup_so } from '../Setup_so';

@Entity({ name: 'ss_so' })
export class Ss_So {
  @PrimaryGeneratedColumn()
  ss_so_id: number;

  @Column()
  ss_so_setup_so_id: number;

  @ManyToOne(() => Setup_so, (Setup_so) => Setup_so.setup_so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ss_so_setup_id' })
  Setup_so?: Setup_so;

  @Column()
  ss_so_so_id: number;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ss_so_so_id' })
  Sub_Order?: Sub_Order;
}
