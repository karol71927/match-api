import { DataSource, Repository } from 'typeorm';
import { TeamRepositoryInterface } from './team.repository-interface';
import { Team } from '../../model/team.model';

export class TeamRepository
  extends Repository<Team>
  implements TeamRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {
    super(Team, datasource.createEntityManager());
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<[Team[], number]> {
    return this.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  async findOneByIdWithPlayers(id: string): Promise<Team> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['players'],
    });
  }

  async findOneByPlayerId(playerId: string): Promise<Team> {
    return this.findOne({ where: { players: { id: playerId } } });
  }

  async findByMatchIdWithPlayersWithPagination(
    matchId: string,
    limit: number,
    offset: number,
  ): Promise<[Team[], number]> {
    return this.findAndCount({
      skip: offset,
      take: limit,
      relations: ['players'],
      relationLoadStrategy: 'join',
      where: {
        players: {
          matches: {
            id: matchId,
          },
        },
      },
    });
  }
}
