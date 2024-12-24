import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
@Entity()
export class Category_Setup_Order {
  @PrimaryGeneratedColumn()
  category_setup_order_id: number;

  @Column()
  category_setup_order_idUser: number;
  @ManyToOne(() => User, (User) => User.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_setup_order_idUser' })
  User?: User;

  @Column()
  category_setup_order_name: string;

  @Column()
  category_setup_order_description: string;
}
