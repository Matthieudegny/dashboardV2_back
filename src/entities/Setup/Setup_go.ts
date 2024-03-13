import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity({ name: 'setup_go' })
export class Setup_go {
  @PrimaryGeneratedColumn()
  setup_go_id: number;

  @Column()
  setup_go_title: string;

  @Column()
  setup_go_description: string;

  @Column()
  setup_go_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_go_idUser' })
  User?: User;
}
