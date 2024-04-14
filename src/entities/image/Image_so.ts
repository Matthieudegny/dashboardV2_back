import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order } from '../Sub_Order';

@Entity()
export class Image_So {
  @PrimaryGeneratedColumn()
  image_so_id: number;

  @Column()
  image_so_so_id: number;

  @ManyToOne(() => Sub_Order, (Sub_Order) => Sub_Order.so_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_so_so_id' })
  Sub_Order: Sub_Order;

  @Column({ type: 'text' })
  image_so_title: string;

  @Column({ type: 'text' })
  image_so_description: string;

  @Column({ type: 'mediumtext' })
  image_so_contentImage: string;
}
