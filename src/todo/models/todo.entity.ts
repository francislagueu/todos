import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column({ default: true })
  isActive: boolean;
  @Column('enum', { enum: Status, default: Status.CREATED })
  status: Status;
}
