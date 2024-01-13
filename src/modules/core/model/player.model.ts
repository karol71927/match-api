import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Team } from './team.model';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.model';

@ObjectType()
@Entity('players')
export class Player {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => Int)
  @Column()
  number: number;

  @Field((type) => Team)
  @ManyToOne(() => Team)
  team: Team;

  @Field((type) => [Match])
  @ManyToMany(() => Match)
  matches: Match[];
}
