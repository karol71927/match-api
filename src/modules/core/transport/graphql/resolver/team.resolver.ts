import { Args, Query, Resolver } from '@nestjs/graphql';
import { TeamService } from '../../../service/team.service';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../../../shared/graphql-relay/connection-pagination-args';
import { connectionFromArraySlice } from 'graphql-relay';
import { TeamPaginatedResponse, TeamResponse } from '../response/team.response';

@Resolver((of) => TeamResponse)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => TeamPaginatedResponse, { description: 'listy drużyn' })
  async findAllTeams(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<TeamPaginatedResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [teams, count] = await this.teamService.findAll(limit, offset);

    return connectionFromArraySlice(teams, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query(() => TeamPaginatedResponse, {
    description: 'drużyn dla konkretnego meczu wraz z graczami',
  })
  async findByMatchIdWithPlayers(
    @Args() paginationArgs: ConnectionPaginationArgs,
    @Args('matchId') matchId: string,
  ): Promise<TeamPaginatedResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [teams, count] = await this.teamService.findByMatchIdWithPlayers(
      matchId,
      limit,
      offset,
    );

    return connectionFromArraySlice(teams, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }
}
