import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';

@Entity('setup_subOrder')
export class Setup_SubOrder {
  @PrimaryGeneratedColumn()
  setup_SubOrder_id: number;

  @Column()
  setup_SubOrder_title: string;

  @Column()
  setup_SubOrder_description: string;

  @Column()
  setup_SubOrder_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setupSubOrder_idUser' })
  User?: User;
}
