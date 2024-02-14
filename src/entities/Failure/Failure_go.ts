import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure } from './Failure';
import { Global_Order } from '../Global_Order';

@Entity()
export class Failure_Go {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_failure_id: number;

  @Column()
  failure_go_go_id: number;

  @ManyToOne(() => Failure, (Failure) => Failure.failure_id)
  @JoinColumn({ name: 'failure_go_failure' })
  Failure: Failure;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id)
  @JoinColumn({ name: 'failure_go_go_id' })
  Global_Order: Global_Order;
}
