import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import Recipe from './Recipe';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(type => Recipe, recipe => recipe.categories)
  recipes: Recipe[];
}
