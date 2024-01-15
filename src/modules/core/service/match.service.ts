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

  async findAll(limit: number, offset: number): Promise<[Match[], number]> {
    return this.matchRepository.findAllWithPagination(limit, offset);
  }

  async findOneByIdWithTeamsAndPlayers(id: string): Promise<Match> {
    return this.matchRepository.findOneByIdWithTeamsAndPlayers(id);
  }

  async findByPlayerId(
    playerId: string,
    limit: number,
    offset: number,
  ): Promise<[Match[], number]> {
    return this.matchRepository.findByPlayerIdWithPagination(
      playerId,
      limit,
      offset,
    );
  }
}
