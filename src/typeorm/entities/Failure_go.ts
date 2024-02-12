import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure } from './Failure';
import { Global_Order } from './Global_Order';

@Entity()
export class FailureGo {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_failure: number;

  @Column()
  failure_go_go_id: number;

  @ManyToOne(() => Failure, (failure) => failure.failure_id)
  @JoinColumn({ name: 'failure_go_failure' })
  failure: Failure;

  @ManyToOne(() => Global_Order, (globalOrder) => globalOrder.go_id)
  @JoinColumn({ name: 'failure_go_go_id' })
  globalOrder: Global_Order;
}
