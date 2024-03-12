import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'failure_go' })
export class Failure_go {
  @PrimaryGeneratedColumn()
  failure_go_id: number;

  @Column()
  failure_go_title: string;

  @Column()
  failure_go_description: string;
}
