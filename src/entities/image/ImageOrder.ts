import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../Order';

@Entity()
export class Image_Order {
  @PrimaryGeneratedColumn()
  image_Order_id: number;

  @Column()
  image_Order_order_id: number;

  @ManyToOne(() => Order, (Global_Order) => Global_Order.order_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imageOrder_order_id' })
  Global_Order: Order;

  @Column({ type: 'text' })
  image_Order_title: string;

  @Column({ type: 'text' })
  image_Order_description: string;

  @Column({ type: 'mediumtext' })
  image_Order_contentImage: string;
}
