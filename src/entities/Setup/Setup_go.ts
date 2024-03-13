import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'setup_go' })
export class Setup_go {
  @PrimaryGeneratedColumn()
  setup_go_id: number;

  @Column()
  setup_go_title: string;

  @Column()
  setup_go_description: string;
}
