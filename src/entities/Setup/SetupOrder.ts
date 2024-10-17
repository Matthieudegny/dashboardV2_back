import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity()
export class Setup_Order {
  @PrimaryGeneratedColumn()
  setup_Order_id: number;

  @Column()
  setup_Order_title: string;

  @Column()
  setup_Order_description: string;
  @Column()
  setup_Order_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_Order_idUser' })
  User?: User;
}
