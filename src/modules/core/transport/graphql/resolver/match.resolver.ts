import { Args, Query, Resolver } from '@nestjs/graphql';
import { MatchService } from '../../../service/match.service';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../../../shared/graphql-relay/connection-pagination-args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  MatchPaginatedResponse,
  MatchResponse,
} from '../response/match.response';
import { FindMatchesForPlayerWithTeamResponse } from '../response/find-matches-for-player-with-team.response';
import { TeamService } from '../../../service/team.service';

@Resolver((of) => MatchResponse)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly teamService: TeamService,
  ) {}

  @Query(() => MatchPaginatedResponse, { description: 'listy meczów' })
  async findAllMatches(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<MatchPaginatedResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [matches, count] = await this.matchService.findAll(limit, offset);

    return connectionFromArraySlice(matches, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query(() => FindMatchesForPlayerWithTeamResponse, {
    description:
      'listy meczów dla konkretnego gracza wraz z drużyną dla jakiej grał',
  })
  async findMatchesForPlayerWithTeam(
    @Args() paginationArgs: ConnectionPaginationArgs,
    @Args({ name: 'playerId' }) playerId: string,
  ): Promise<FindMatchesForPlayerWithTeamResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [matches, count] = await this.matchService.findByPlayerId(
      playerId,
      limit,
      offset,
    );

    const team = await this.teamService.findOneByPlayerId(playerId);

    return {
      ...connectionFromArraySlice(matches, paginationArgs, {
        arrayLength: count,
        sliceStart: offset || 0,
      }),
      ...team,
    };
  }
}
