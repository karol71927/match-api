import { Args, Query, Resolver } from '@nestjs/graphql';
import { Match } from '../model/match.model';
import { MatchService } from '../service/match.service';
import ConnectionPaginationArgs, {
  getPagingParameters,
} from '../../../shared/graphql-relay/connection-pagination-args';
import { MatchResponse } from './response/match.response';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver((of) => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query((returns) => MatchResponse)
  async findAllMatches(
    @Args() paginationArgs: ConnectionPaginationArgs,
  ): Promise<MatchResponse> {
    const { limit, offset } = getPagingParameters(paginationArgs);

    const [matches, count] = await this.matchService.findAll(limit, offset);

    return connectionFromArraySlice(matches, paginationArgs, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  @Query((returns) => Match)
  async findOneMatchByIdWithTeamsAndPlayers(
    @Args({ name: 'id' }) id: string,
  ): Promise<Match> {
    return this.matchService.findOneByIdWithTeamsAndPlayers(id);
  }
}
