import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure_go } from '../Failure_go';
import { Global_Order } from '../../Global_Order';

@Entity({ name: 'fg_go' })
export class Fg_Go {
  @PrimaryGeneratedColumn()
  fg_go_id: number;

  @Column()
  fg_go_failure_id: number;

  @Column()
  fg_go_go_id: number;

  @ManyToOne(() => Failure_go, (Failure_go) => Failure_go.failure_go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_go_failure_id' })
  Failure_go?: Failure_go;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_go_go_id' })
  Global_Order?: Global_Order;
}
