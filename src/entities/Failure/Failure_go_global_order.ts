import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure } from './Failure';
import { Global_Order } from '../Global_Order';

@Entity({ name: 'failure_go_global_order' })
export class Failure_Go_Global_Order {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_failure_id: number;

  @Column()
  failure_go_go_id: number;

  @ManyToOne(() => Failure, (Failure) => Failure.failure_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_go_failure_id' })
  Failure?: Failure;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_go_go_id' })
  Global_Order?: Global_Order;
}
