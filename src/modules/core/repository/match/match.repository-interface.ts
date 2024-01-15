import { Repository } from 'typeorm';
import { Match } from '../../model/match.model';
import { BaseRepositoryInterface } from '../../../../shared/base-repository/base-repository.interface';

export const MATCH_REPOSITORY_TOKEN = 'MATCH_REPOSITORY_TOKEN';

export interface MatchRepositoryInterface
  extends BaseRepositoryInterface<Match> {
  findOneByIdWithTeamsAndPlayers(id: string): Promise<Match>;

  findByPlayerIdWithPagination(
    playerId: string,
    limit: number,
    offset: number,
  ): Promise<[Match[], number]>;
}
