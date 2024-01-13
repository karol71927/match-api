import { Query, Resolver } from '@nestjs/graphql';
import { Match } from '../model/match.model';
import { MatchService } from '../service/match.service';

@Resolver((of) => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query((returns) => [Match])
  async findAllMatches(): Promise<Match[]> {
    return this.matchService.findAll();
  }

  @Query((returns) => Match)
  async findOneMatchByIdWithTeamsAndPlayers(id: string): Promise<Match> {
    return this.matchService.findOneByIdWithTeamsAndPlayers(id);
  }
}
