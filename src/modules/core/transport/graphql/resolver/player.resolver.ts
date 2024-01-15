import { Args, Query, Resolver } from '@nestjs/graphql';
import { PlayerService } from '../../../service/player.service';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../../../shared/graphql-relay/connection-pagination-args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  PlayerPaginatedResponse,
  PlayerResponse,
} from '../response/player.response';

@Resolver((of) => PlayerResponse)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query(() => PlayerPaginatedResponse, { description: 'listy graczy' })
  async findAllPlayers(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<PlayerPaginatedResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [players, count] = await this.playerService.findAll(limit, offset);

    return connectionFromArraySlice(players, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query(() => PlayerPaginatedResponse, {
    description: 'listy graczy dla konkretnej drużyny',
  })
  async findPlayersInTeam(
    @Args() paginationArgs: ConnectionPaginationArgs,
    @Args('teamId') teamId: string,
  ): Promise<PlayerPaginatedResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);
    console.log(limit, offset);
    const [players, count] = await this.playerService.findByTeamId(
      teamId,
      limit,
      offset,
    );

    return connectionFromArraySlice(players, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query(() => PlayerResponse, {
    description: 'drużyny dla konkretnego gracza',
  })
  async findOnePlayerByIdWithTeam(
    @Args({ name: 'id' }) id: string,
  ): Promise<PlayerResponse> {
    return this.playerService.findOneByIdWithTeam(id);
  }
}
