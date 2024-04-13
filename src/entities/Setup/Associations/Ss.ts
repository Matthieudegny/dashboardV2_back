import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order } from '../../Sub_Order';
import { Setup_so } from '../Setup_so';

@Entity({ name: 'sso' })
export class Ss_So {
  @PrimaryGeneratedColumn()
  sso_id: number;

  @Column()
  sso_setup_so_id: number;

  @ManyToOne(() => Setup_so, (Setup_so) => Setup_so.setup_so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sso_setup_so_id' })
  Setup_so?: Setup_so;

  @Column()
  sso_so_id: number;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sso_so_id' })
  Sub_Order?: Sub_Order;
}
