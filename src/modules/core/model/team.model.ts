import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from './player.model';
import { Match } from './match.model';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @ManyToMany(() => Match)
  @JoinTable({
    name: 'team_matches',
    inverseJoinColumn: { name: 'match_id' },
    joinColumn: { name: 'team_id' },
  })
  matches: Match[];
}
