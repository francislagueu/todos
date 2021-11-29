import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @CreateDateColumn()
  createOn: Date;
  @UpdateDateColumn()
  updateOn: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
