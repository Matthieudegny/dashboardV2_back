import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder_Reduce } from '../Suborder_Reduce';

@Entity()
export class Image_Suborder_Reduce {
  @PrimaryGeneratedColumn()
  image_Suborder_reduce_id: number;

  @Column()
  image_Suborder_reduce_subOrder_reduce_id: number;
  @ManyToOne(
    () => Suborder_Reduce,
    (Sub_Order) => Sub_Order.subOrder_reduce_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'image_Suborder_reduce_subOrder_reduce_id' })
  Sub_Order: Suborder_Reduce;

  @Column({ type: 'text' })
  image_Suborder_reduce_title: string;

  @Column({ type: 'text' })
  image_Suborder_reduce_description: string;

  @Column({ type: 'mediumtext' })
  image_Suborder_reduce_contentImage: string;
}
