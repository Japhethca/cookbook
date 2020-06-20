import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from './User';
import Step from './Step';
import Ingredient from './Ingredient';
import Comment from './Comment';
import Category from './Category';

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

  @ManyToMany(type => Category, category => category.id, { cascade: true })
  @JoinTable()
  categories: Category[];

  // @OneToMany(type => Photos, photo => photo.)
  // photos: Photos;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
