import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity()
export class Setup_SubOrder_Add {
  @PrimaryGeneratedColumn()
  setup_SubOrder_Add_id: number;

  @Column()
  setup_SubOrder_Add_title: string;

  @Column()
  setup_SubOrder_Add_description: string;

  @Column()
  setup_SubOrder_Add_idUser: number;
  // @ManyToOne(() => User, (User) => User.idUser, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'setupSubOrder_idUser' })
  // User?: User;
}
