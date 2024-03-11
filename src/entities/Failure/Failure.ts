import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'failure' })
export class Failure {
  @PrimaryGeneratedColumn()
  failure_id: number;

  @Column()
  failure_title: string;

  @Column()
  failure_description: string;
}
