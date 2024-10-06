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
  setupOrder_id: number;

  @Column()
  setupOrder_title: string;

  @Column()
  setupOrder_description: string;
  @Column()
  setupOrder_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setupOrder_idUser' })
  User?: User;
}
