import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'setup_so' })
export class Setup_so {
  @PrimaryGeneratedColumn()
  setup_so_id: number;

  @Column()
  setup_so_title: string;

  @Column()
  setup_so_description: string;
}
