import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order_Reduce } from '../Sub_Order_Reduce';

@Entity()
export class Image_Suborder_Reduce {
  @PrimaryGeneratedColumn()
  image_Suborder_reduce_id: number;

  @Column()
  image_Suborder_reduce_subOrder_reduce_id: number;

  // @ManyToOne(() => Sub_Order_Reduce, (Sub_Order) => Sub_Order.subOrder_id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'imageSubOrder_subOrder_id' })
  // Sub_Order: Sub_Order_Reduce;

  @Column({ type: 'text' })
  image_Suborder_reduce_title: string;

  @Column({ type: 'text' })
  image_Suborder_reduce_description: string;

  @Column({ type: 'mediumtext' })
  image_Suborder_reduce_contentImage: string;
}
