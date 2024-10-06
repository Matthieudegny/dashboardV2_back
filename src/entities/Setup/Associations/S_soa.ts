import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suborder_Add } from 'src/entities/Suborder_Add';
import { Setup_SubOrder_Add } from '../Setup_SubOrder_Add';

@Entity({ name: 's_soa' })
export class S_soa {
  @PrimaryGeneratedColumn()
  s_soa_id: number;

  @Column()
  s_soa_setup_SubOrder_Add_id: number;
  @ManyToOne(() => Setup_SubOrder_Add, (Setup) => Setup.setup_SubOrder_Add_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_soa_setup_SubOrder_Add_id' })
  Setup?: Setup_SubOrder_Add;

  @Column()
  s_soa_subOrder_Add_id: number;
  // @ManyToOne(() => Sub_Order_Add, (Suborder) => Suborder.subOrder_add_id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 's_soa_subOrder_id' })
  // Suborder?: Sub_Order_Add;
}
