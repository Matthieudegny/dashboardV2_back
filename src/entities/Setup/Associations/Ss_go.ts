import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Global_Order } from '../../Global_Order';
import { Setup_go } from '../Setup_go';

@Entity({ name: 'sg_go' })
export class Sg_Go {
  @PrimaryGeneratedColumn()
  sg_go_id: number;

  @Column()
  sg_go_setup_go_id: number;

  @ManyToOne(() => Setup_go, (Setup) => Setup.setup_go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_go_setup_go_id' })
  Setup?: Setup_go;

  @Column()
  sg_go_go_id: number;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_go_go_id' })
  Global_Order?: Global_Order;
}
