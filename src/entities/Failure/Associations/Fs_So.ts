import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Failure_so } from '../Failure_so';
import { Sub_Order_Reduce } from '../../Sub_Order_Reduce';

@Entity({ name: 'fs_so' })
export class Fs_So {
  @PrimaryGeneratedColumn()
  fs_so_id: number;

  @Column()
  fs_so_failure_so_id: number;

  @Column()
  fs_so_sub_order_id: number;

  @ManyToOne(() => Failure_so, (Failure_so) => Failure_so.failure_so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fs_so_failure_so_id' })
  Failure_so: Failure_so;

  @ManyToOne(() => Sub_Order_Reduce, (Sub_Order) => Sub_Order.subOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fs_so_sub_order_id' })
  Sub_Order?: Sub_Order_Reduce;
}
