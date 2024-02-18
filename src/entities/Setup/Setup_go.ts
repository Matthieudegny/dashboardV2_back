import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Global_Order } from '../Global_Order';
import { Setup } from './Setup';

@Entity()
export class Setup_Go {
  @PrimaryGeneratedColumn()
  setup_go_id: number;

  @Column()
  setup_go_setup_id: number;

  @ManyToOne(() => Setup, (Setup) => Setup.setup_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'setup_go_setup_id' })
  Setup: Setup;

  @Column()
  setup_go_go_id: number;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_go_go_id' })
  Global_Order: Global_Order;
}
