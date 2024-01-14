import { Args, Query, Resolver } from '@nestjs/graphql';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player.service';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../shared/graphql-relay/connection-pagination-args';
import { PlayerResponse } from './response/player.response';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver((of) => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query((returns) => PlayerResponse)
  async findAllPlayers(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<PlayerResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [players, count] = await this.playerService.findAll(limit, offset);

    return connectionFromArraySlice(players, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query((returns) => Player)
  async findOnePlayerByIdWithTeam(
    @Args({ name: 'id' }) id: string,
  ): Promise<Player> {
    return this.playerService.findOneByIdWithTeam(id);
  }
}
