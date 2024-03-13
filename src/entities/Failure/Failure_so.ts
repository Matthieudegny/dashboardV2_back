import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../User';

@Entity({ name: 'failure_so' })
export class Failure_so {
  @PrimaryGeneratedColumn()
  failure_so_id: number;

  @Column()
  failure_so_title: string;

  @Column()
  failure_so_description: string;

  @Column()
  failure_so_idUser: number;

  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_so_idUser' })
  User?: User;
}
