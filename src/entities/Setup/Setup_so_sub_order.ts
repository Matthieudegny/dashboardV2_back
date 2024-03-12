import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order } from '../Sub_Order';
import { Setup } from './Setup';

@Entity({ name: 'setup_so_sub_order' })
export class Setup_So_sub_order {
  @PrimaryGeneratedColumn()
  setup_so_id: number;

  @Column()
  setup_so_setup_id: number;

  @ManyToOne(() => Setup, (Setup) => Setup.setup_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setup_so_setup_id' })
  Setup?: Setup;

  @Column()
  setup_so_so_id: number;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_so_so_id' })
  Sub_Order?: Sub_Order;
}
