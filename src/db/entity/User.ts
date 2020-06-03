import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'char', length: 100, unique: true, nullable: true })
  username: string;

  @Column({ type: 'char', length: 200, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'char', length: 100, nullable: true })
  firstname: string;

  @Column({ type: 'char', length: 100, nullable: true })
  lastname: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;
}
