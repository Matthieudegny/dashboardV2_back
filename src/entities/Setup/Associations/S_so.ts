import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder } from '../../Suborder';
import { Setup_SubOrder } from '../Setup_SubOrder';

@Entity({ name: 's_so' })
export class S_so {
  @PrimaryGeneratedColumn()
  s_so_id: number;

  @Column()
  s_so_setupSubOrder_id: number;

  @ManyToOne(() => Setup_SubOrder, (Setup_so) => Setup_so.setup_SubOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_so_setupSubOrder_id' })
  Setup_so?: Setup_SubOrder;

  @Column()
  s_so_subOrder_id: number;
  @ManyToOne(() => Suborder, (Sub_Order) => Sub_Order.subOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_so_subOrder_id' })
  Suborder?: Suborder;
}
