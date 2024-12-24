import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';
import { Category_Setup_Order } from './Category_Setup_Order';
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

  @Column({ nullable: true, default: null })
  setup_Order_CategorySetupId: number;

  @ManyToOne(
    () => Category_Setup_Order,
    (categorySetupOrder) => categorySetupOrder.category_setup_order_id,
    {
      onDelete: 'CASCADE',
      nullable: true, // Make the relationship optional
    },
  )
  @JoinColumn({ name: 'setup_Order_CategorySetupId' })
  Category_Setup_Order?: Category_Setup_Order;
}
