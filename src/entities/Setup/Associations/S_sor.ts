import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order_Reduce } from '../../Sub_Order_Reduce';
import { SetupSubOrder } from '../SetupSubOrder';

@Entity({ name: 's_sor' })
export class S_sor {
  @PrimaryGeneratedColumn()
  s_sor_id: number;

  @Column()
  s_sor_setupSubOrder_id: number;

  @ManyToOne(() => SetupSubOrder, (Setup_so) => Setup_so.setupSubOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_sor_setupSubOrder_id' })
  Setup_so?: SetupSubOrder;

  @Column()
  s_sor_subOrder_id: number;
  @ManyToOne(
    () => Sub_Order_Reduce,
    (Sub_Order_Reduce) => Sub_Order_Reduce.subOrder_reduce_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 's_sor_subOrder_id' })
  Sub_Order_Reduce?: Sub_Order_Reduce;
}
