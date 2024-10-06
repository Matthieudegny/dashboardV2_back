import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity()
export class Setup_SubOrder_Reduce {
  @PrimaryGeneratedColumn()
  setup_SubOrder_Reduce_id: number;

  @Column()
  setup_SubOrder_Reduce_title: string;

  @Column()
  setup_SubOrder_Reduce_description: string;

  @Column()
  setup_SubOrder_Reduce_idUser: number;
  // @ManyToOne(() => User, (User) => User.idUser, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'setupSubOrder_idUser' })
  // User?: User;
}
