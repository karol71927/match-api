import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../../shared/graphql-relay/graphql-relay.types';
import { TeamResponse } from './team.response';
import { MatchResponse } from './match.response';

@ObjectType()
export class PlayerResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  number: number;

  @Field((type) => TeamResponse)
  team: TeamResponse;

  @Field((type) => [MatchResponse])
  matches: MatchResponse[];
}

@ObjectType()
export class PlayerPaginatedResponse extends relayTypes<PlayerResponse>(
  PlayerResponse,
) {}
