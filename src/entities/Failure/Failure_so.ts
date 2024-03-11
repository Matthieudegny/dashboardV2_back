import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'failure_so' })
export class Failure_so {
  @PrimaryGeneratedColumn()
  failure_so_id: number;

  @Column()
  failure_so_title: string;

  @Column()
  failure_so_description: string;
}
