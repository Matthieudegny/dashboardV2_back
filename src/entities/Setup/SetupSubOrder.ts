import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity()
export class SetupSubOrder {
  @PrimaryGeneratedColumn()
  setupSubOrder_id: number;

  @Column()
  setupSubOrder_title: string;

  @Column()
  setupSubOrder_description: string;

  @Column()
  setupSubOrder_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setupSubOrder_idUser' })
  User?: User;
}
