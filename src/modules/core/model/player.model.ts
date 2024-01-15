import { Team } from './team.model';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.model';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  number: number;

  @ManyToOne(() => Team)
  team: Team;

  @ManyToMany(() => Match)
  matches: Match[];
}
