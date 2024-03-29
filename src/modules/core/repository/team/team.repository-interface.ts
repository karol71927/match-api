import { Team } from '../../model/team.model';
import { BaseRepositoryInterface } from '../../../../shared/base-repository/base-repository.interface';

export const TEAM_REPOSITORY_TOKEN = 'TEAM_REPOSITORY_TOKEN';

export interface TeamRepositoryInterface extends BaseRepositoryInterface<Team> {
  findOneByIdWithPlayers(id: string): Promise<Team>;

  findOneByPlayerId(playerId: string): Promise<Team>;

  findByMatchIdWithPlayersWithPagination(
    matchId: string,
    limit: number,
    offset: number,
  ): Promise<[Team[], number]>;
}
