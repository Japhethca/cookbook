import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Recipe from './Recipe';

@Entity()
export default class Ingredient {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(type => Recipe, recipe => recipe.ingredients)
  recipeId: number;
}
