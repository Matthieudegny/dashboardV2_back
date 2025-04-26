import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';

@Entity()
export class TradingInstrument {
  @PrimaryGeneratedColumn()
  trading_instrument_id: number;

  @Column({ type: 'text' })
  trading_instrument_title: string;

  @Column()
  trading_instrument_user_id: number;

  @ManyToOne(() => User, (user) => user.idUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trading_instrument_user_id' })
  user: User;
}
