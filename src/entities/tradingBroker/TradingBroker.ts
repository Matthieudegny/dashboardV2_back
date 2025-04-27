import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';

@Entity('trading_broker')
export class TradingBroker {
  @PrimaryGeneratedColumn({ name: 'trading_broker_id' })
  trading_broker_id: number;

  @Column({ name: 'trading_broker_title' })
  trading_broker_title: string;

  @Column({ name: 'trading_broker_user_id' })
  trading_broker_user_id: number;

  @ManyToOne(() => User, (user) => user.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trading_broker_user_id' })
  user: User;
}
