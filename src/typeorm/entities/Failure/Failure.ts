import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Failure {
  @PrimaryGeneratedColumn()
  failure_id: number;

  @Column()
  failure_title: string;

  @Column()
  failure_description: string;
}
