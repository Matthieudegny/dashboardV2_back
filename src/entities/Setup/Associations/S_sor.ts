import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder_Reduce } from '../../Suborder_Reduce';
import { Setup_SubOrder_Reduce } from '../Setup_SubOrder_Reduce';

@Entity({ name: 's_sor' })
export class S_sor {
  @PrimaryGeneratedColumn()
  s_sor_id: number;

  @Column()
  s_sor_setupSubOrder_id: number;

  @ManyToOne(
    () => Setup_SubOrder_Reduce,
    (Setup_so) => Setup_so.setup_SubOrder_Reduce_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 's_sor_setupSubOrder_id' })
  Setup_so?: Setup_SubOrder_Reduce;

  @Column()
  s_sor_subOrder_id: number;
  @ManyToOne(
    () => Suborder_Reduce,
    (Sub_Order_Reduce) => Sub_Order_Reduce.subOrder_reduce_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 's_sor_subOrder_id' })
  Suborder_Reduce?: Suborder_Reduce;
}
