import { Player } from '../../model/player.model';
import { BaseRepositoryInterface } from '../../../../shared/base-repository/base-repository.interface';

export const PLAYER_REPOSITORY_TOKEN = 'PLAYER_REPOSITORY_TOKEN';

export interface PlayerRepositoryInterface
  extends BaseRepositoryInterface<Player> {
  findByTeamIdWithPagination(
    teamId: string,
    limit: number,
    offset: number,
  ): Promise<[Player[], number]>;

  findOneByIdWithTeam(id: string): Promise<Player>;
}
