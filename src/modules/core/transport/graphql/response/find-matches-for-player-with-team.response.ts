import { IntersectionType, ObjectType } from '@nestjs/graphql';
import { MatchPaginatedResponse } from './match.response';
import { TeamResponse } from './team.response';

@ObjectType()
export class FindMatchesForPlayerWithTeamResponse extends IntersectionType(
  MatchPaginatedResponse,
  TeamResponse,
) {}
