import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder_Add } from '../Suborder_Add';

@Entity()
export class Image_Suborder_Add {
  @PrimaryGeneratedColumn()
  image_Suborder_add_id: number;

  @Column()
  image_Suborder_add_subOrder_add_id: number;
  @ManyToOne(() => Suborder_Add, (Sub_Order) => Sub_Order.subOrder_add_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'image_Suborder_add_subOrder_add_id' })
  Sub_Order: Suborder_Add;

  @Column({ type: 'text' })
  image_Suborder_add_title: string;

  @Column({ type: 'text' })
  image_Suborder_add_description: string;

  @Column({ type: 'mediumtext' })
  image_Suborder_add_contentImage: string;
}
