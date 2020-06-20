import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  url: string;
}
