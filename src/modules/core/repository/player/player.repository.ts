import { DataSource, Repository } from 'typeorm';
import { PlayerRepositoryInterface } from './player.repository-interface';
import { Player } from '../../model/player.model';

export class PlayerRepository
  extends Repository<Player>
  implements PlayerRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {
    super(Player, datasource.createEntityManager());
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<[Player[], number]> {
    return this.findAndCount({
      take: limit,
      skip: offset,
    });
  }

  async findByTeamIdWithPagination(
    teamId: string,
    limit: number,
    offset: number,
  ): Promise<[Player[], number]> {
    return this.findAndCount({
      take: limit,
      skip: offset,
      where: {
        team: {
          id: teamId,
        },
      },
    });
  }

  async findOneByIdWithTeam(id: string): Promise<Player> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['team'],
    });
  }
}
