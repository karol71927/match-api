import { Field, ID, ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../../shared/graphql-relay/graphql-relay.types';
import { TeamResponse } from './team.response';
import { PlayerResponse } from './player.response';

@ObjectType()
export class MatchResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  occursAt: Date;

  @Field(() => [TeamResponse])
  teams: TeamResponse[];

  @Field(() => [PlayerResponse])
  players: PlayerResponse[];
}

@ObjectType()
export class MatchPaginatedResponse extends relayTypes<MatchResponse>(
  MatchResponse,
) {}
