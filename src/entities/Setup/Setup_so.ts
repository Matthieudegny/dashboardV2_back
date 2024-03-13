import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity({ name: 'setup_so' })
export class Setup_so {
  @PrimaryGeneratedColumn()
  setup_so_id: number;

  @Column()
  setup_so_title: string;

  @Column()
  setup_so_description: string;

  @Column()
  setup_so_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'setup_so_idUser' })
  User?: User;
}
