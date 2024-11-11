import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder } from '../Suborder';

@Entity()
export class Image_Suborder {
  @PrimaryGeneratedColumn()
  image_Suborder_id: number;

  @Column()
  image_Suborder_subOrder_id: number;
  @ManyToOne(() => Suborder, (Sub_Order) => Sub_Order.subOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_Suborder_subOrder_id' })
  Sub_Order: Suborder;

  @Column({ type: 'text' })
  image_Suborder_title: string;

  @Column({ type: 'text' })
  image_Suborder_description: string;

  @Column({ type: 'mediumtext' })
  image_Suborder_contentImage: string;
}
