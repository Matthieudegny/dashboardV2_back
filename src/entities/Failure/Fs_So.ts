import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure } from './Failure';
import { Sub_Order } from '../Sub_Order';

@Entity({ name: 'fs_so' })
export class Fs_So {
  @PrimaryGeneratedColumn()
  fs_so_id: number;

  @Column()
  fs_so_failure_so_id: number;

  @Column()
  fs_so_sub_order_id: number;

  @ManyToOne(() => Failure, (Failure) => Failure.failure_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_so_failure' })
  Failure?: Failure;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_so_so_id' })
  Sub_Order?: Sub_Order;
}
