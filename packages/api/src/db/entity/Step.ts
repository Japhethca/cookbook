import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Recipe from './Recipe';

@Entity()
export default class Step {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @ManyToOne(type => Recipe, recipe => recipe.steps)
  recipeId: number;
}
