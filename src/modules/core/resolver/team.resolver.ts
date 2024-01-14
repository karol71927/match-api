import { Args, Query, Resolver } from '@nestjs/graphql';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';
import { TeamResponse } from './response/team.response';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../shared/graphql-relay/connection-pagination-args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver((of) => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => TeamResponse)
  async findAllTeams(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<TeamResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [teams, count] = await this.teamService.findAll(limit, offset);

    return connectionFromArraySlice(teams, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query(() => Team)
  async findOneTeamByIdWithPlayers(
    @Args({ name: 'id' }) id: string,
  ): Promise<Team> {
    return this.teamService.findOneByIdWithPlayers(id);
  }
}
