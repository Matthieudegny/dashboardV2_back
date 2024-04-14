import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../Order';

@Entity()
export class Image_Go {
  @PrimaryGeneratedColumn()
  imageOrder_id: number;

  @Column()
  imageOrder_order_id: number;

  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imageOrder_order_id' })
  Global_Order: Order;

  @Column({ type: 'text' })
  imageOrder_title: string;

  @Column({ type: 'text' })
  imageOrder_description: string;

  @Column({ type: 'mediumtext' })
  imageOrder_contentImage: string;
}
