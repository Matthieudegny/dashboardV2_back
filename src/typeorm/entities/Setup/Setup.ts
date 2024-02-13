import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Setup {
  @PrimaryGeneratedColumn()
  setup_id: number;

  @Column({ type: 'text' })
  setup_title: string;

  @Column({ type: 'text' })
  setup_description: string;
}
