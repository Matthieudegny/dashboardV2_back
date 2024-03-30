import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Global_Order } from '../Global_Order';

@Entity()
export class Image_Go {
  @PrimaryGeneratedColumn()
  image_go_id: number;

  @Column()
  image_go_go_id: number;

  @ManyToOne(() => Global_Order, (Global_Order) => Global_Order.go_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_go_go_id' })
  Global_Order: Global_Order;

  @Column({ type: 'text' })
  image_go_title: string;

  @Column({ type: 'text' })
  image_go_description: string;

  @Column({ type: 'text' })
  image_go_path: string;
}
