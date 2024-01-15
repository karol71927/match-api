import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.model';
import { Player } from './player.model';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  occursAt: Date;

  @ManyToMany(() => Team)
  @JoinTable({
    name: 'team_matches',
    joinColumn: { name: 'match_id' },
    inverseJoinColumn: { name: 'team_id' },
  })
  teams: Team[];

  @ManyToMany(() => Player)
  @JoinTable({
    name: 'player_matches',
    joinColumn: { name: 'match_id' },
    inverseJoinColumn: { name: 'player_id' },
  })
  players: Player[];
}
