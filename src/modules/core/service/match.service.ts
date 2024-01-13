import { Inject, Injectable } from '@nestjs/common';
import {
  MATCH_REPOSITORY_TOKEN,
  MatchRepositoryInterface,
} from '../repository/match/match.repository-interface';
import { Match } from '../model/match.model';

@Injectable()
export class MatchService {
  constructor(
    @Inject(MATCH_REPOSITORY_TOKEN)
    private readonly matchRepository: MatchRepositoryInterface,
  ) {}

  findAll(): Promise<Match[]> {
    return this.matchRepository.findAll();
  }

  findOneByIdWithTeamsAndPlayers(id: string): Promise<Match> {
    return this.matchRepository.findOneByIdWithTeamsAndPlayers(id);
  }
}
