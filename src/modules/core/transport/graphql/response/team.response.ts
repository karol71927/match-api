import { Field, ID, ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../../shared/graphql-relay/graphql-relay.types';
import { PlayerResponse } from './player.response';

@ObjectType()
export class TeamResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [PlayerResponse])
  players: PlayerResponse[];
}

@ObjectType()
export class TeamPaginatedResponse extends relayTypes<TeamResponse>(
  TeamResponse,
) {}
