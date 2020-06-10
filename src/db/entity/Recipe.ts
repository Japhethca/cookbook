import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import User from './User';
import Step from './Step';
import Ingredient from './Ingredient';
import Comment from './Comment';

@Entity()
export default class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.userId)
  author: number;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @OneToMany(type => Step, step => step.recipeId, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  steps: Step[];

  @OneToMany(type => Ingredient, ingredient => ingredient.recipeId, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  ingredients: Ingredient[];

  @OneToMany(type => Comment, comment => comment.recipeId, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @Column({ type: 'text', nullable: true })
  coverImage: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
