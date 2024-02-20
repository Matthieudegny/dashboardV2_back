import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Global_Order {
  @PrimaryGeneratedColumn()
  go_id: number;

  @Column()
  go_user_id: number;

  @ManyToOne(() => User, (user) => user.idUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'go_user_id' })
  user?: User;

  @Column({ type: 'datetime' })
  go_openDate: Date;

  @Column({ type: 'datetime' })
  go_closeDate: Date;

  @Column({ type: 'varchar', length: 45 })
  go_asset: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_entryPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_exitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_percentageEngaged: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_percentageStopLoss: number;

  @Column({ type: 'boolean' })
  go_status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  go_result: number;

  @Column({ type: 'text' })
  go_comment: string;

  @Column()
  go_direction: string;
}
