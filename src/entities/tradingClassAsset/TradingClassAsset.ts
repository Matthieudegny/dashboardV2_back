import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';

@Entity('trading_classAsset')
export class TradingClassAsset {
  @PrimaryGeneratedColumn()
  trading_classAsset_id: number;

  @Column({ type: 'text' })
  trading_classAsset_title: string;

  @Column()
  trading_classAsset_user_id: number;

  @ManyToOne(() => User, (user) => user.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trading_classAsset_user_id' })
  user: User;
}
