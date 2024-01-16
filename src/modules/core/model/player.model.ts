import { Team } from './team.model';
import {
  Column,
  Entity,
  JoinTable,
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
  @JoinTable({
    name: 'player_matches',
    inverseJoinColumn: { name: 'match_id' },
    joinColumn: { name: 'player_id' },
  })
  matches: Match[];
}
