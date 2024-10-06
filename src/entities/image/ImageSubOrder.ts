import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order_Reduce } from '../Sub_Order_Reduce';

@Entity()
export class Image_SubOrder {
  @PrimaryGeneratedColumn()
  imageSubOrder_id: number;

  @Column()
  imageSubOrder_subOrder_id: number;

  // @ManyToOne(() => Sub_Order_Reduce, (Sub_Order) => Sub_Order.subOrder_id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'imageSubOrder_subOrder_id' })
  // Sub_Order: Sub_Order_Reduce;

  @Column({ type: 'text' })
  imageSubOrder_title: string;

  @Column({ type: 'text' })
  imageSubOrder_description: string;

  @Column({ type: 'mediumtext' })
  imageSubOrder_contentImage: string;
}
