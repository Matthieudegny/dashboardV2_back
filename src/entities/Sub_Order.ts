import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Global_Order } from './Global_Order';

@Entity()
export class Sub_Order {
  @PrimaryGeneratedColumn()
  so_id: number;

  @Column()
  so_go_id: number;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'so_go_id' })
  Global_Order: Global_Order;

  @Column({ type: 'datetime' })
  so_openDate: Date;

  @Column({ type: 'datetime' })
  so_closeDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  so_quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  so_entryPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  so_exitPrice: number;

  @Column({ type: 'boolean' })
  so_status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  so_result: number;

  @Column({ type: 'text' })
  so_comment: string;
}
