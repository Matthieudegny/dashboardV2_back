import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../User';
  @Entity()
  export class Category_Setup_SubOrder {
    @PrimaryGeneratedColumn()
    category_setup_subOrder_id: number;
  
    @Column()
    category_setup_subOrder_idUser: number;
    @ManyToOne(() => User, (User) => User.idUser, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'category_setup_subOrder_idUser' })
    User?: User;
  
    @Column()
    category_setup_subOrder_name: string;
  
  @Column()
    category_setup_subOrder_description: string;
}
  