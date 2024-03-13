import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../User';

@Entity({ name: 'failure_go' })
export class Failure_go {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_title: string;

  @Column()
  failure_go_description: string;

  @Column()
  failure_go_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'failure_go_idUser' })
  User?: User;
}
