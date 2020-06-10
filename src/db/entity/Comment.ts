import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Recipe from './Recipe';
import User from './User';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => User)
  userId: string;

  @ManyToOne(type => Recipe, recipe => recipe.comments)
  recipeId: number;
}
