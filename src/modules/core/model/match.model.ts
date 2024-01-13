import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.model';
import { Player } from './player.model';

@ObjectType()
@Entity('matches')
export class Match {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  occursAt: Date;

  @Field(() => [Team])
  @ManyToMany(() => Team)
  @JoinTable({
    name: 'team_matches',
    joinColumn: { name: 'match_id' },
    inverseJoinColumn: { name: 'team_id' },
  })
  teams: Team[];

  @Field(() => [Player])
  @ManyToMany(() => Player)
  @JoinTable({
    name: 'player_matches',
    joinColumn: { name: 'match_id' },
    inverseJoinColumn: { name: 'player_id' },
  })
  players: Player[];
}
