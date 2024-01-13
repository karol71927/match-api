import { Player } from '../../model/player.model';
import { BaseRepositoryInterface } from '../../../../shared/base-repository/base-repository.interface';

export const PLAYER_REPOSITORY_TOKEN = 'PLAYER_REPOSITORY_TOKEN';

export interface PlayerRepositoryInterface
  extends BaseRepositoryInterface<Player> {
  findOneByIdWithTeam(id: string): Promise<Player>;
}
