import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sub_Order_Add } from 'src/entities/Sub_Order_Add';
import { SetupOrder } from '../SetupOrder';

@Entity({ name: 's_soa' })
export class S_soa {
  @PrimaryGeneratedColumn()
  s_soa_id: number;

  @Column()
  s_soa_setupOrder_id: number;
  @ManyToOne(() => SetupOrder, (Setup) => Setup.setupOrder_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_soa_setupOrder_id' })
  Setup?: SetupOrder;

  @Column()
  s_soa_subOrder_id: number;
  @ManyToOne(() => Sub_Order_Add, (Suborder) => Suborder.subOrder_add_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 's_soa_subOrder_id' })
  Suborder?: Sub_Order_Add;
}
