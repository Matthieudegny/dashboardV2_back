import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Setup {
  @PrimaryGeneratedColumn()
  setup_id: number;

  @Column()
  setup_title: string;

  @Column()
  setup_description: string;
}
