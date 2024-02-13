import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure } from './Failure';
import { Sub_Order } from '../Sub_Order';

@Entity()
export class Failure_go {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_failure: number;

  @Column()
  failure_go_go_id: number;

  @ManyToOne(() => Failure, (failure) => failure.failure_id)
  @JoinColumn({ name: 'failure_go_failure' })
  failure: Failure;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id)
  @JoinColumn({ name: 'failure_go_go_id' })
  globalOrder: Sub_Order;
}
